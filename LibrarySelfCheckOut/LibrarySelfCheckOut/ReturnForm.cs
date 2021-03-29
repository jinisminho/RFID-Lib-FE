using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibrarySelfCheckOut.Models;
using LibrarySelfCheckOut.Processors;
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut
{
    public partial class ReturnForm : Form
    {

        private const String BT_TXT_DONE = "DONE";
        private const String BT_TXT_RETURN = "RETURN";


        private int sesionTime = Constant.PROCESS_SESSION_TIME_OUT;

        private List<String> bookCodeList;

        private String bookRFID;

        private int numberOfBookScanned = 0;

        private IDictionary<String, String> bookCodeMap;


        public ReturnForm()
        {
            InitializeComponent();
            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;
            this.txtBookCode.BackColor = Color.White;
            this.spiner.Hide();
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.lbSessionTimeOut.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.bookCodeList = new List<String>();
            this.bookCodeMap = new Dictionary<String, String>();
            this.btDone.Enabled = false;
            this.btDone.Text = BT_TXT_RETURN;
            this.lbCurrentDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");
        }



        private void timerSessionTimeOut_Tick(object sender, EventArgs e)
        {
            this.sesionTime -= 1;
            this.lbSessionTimeOut.Text = "SESSION TIMEOUT: " + this.sesionTime;
            if (this.sesionTime == 0)
            {
                this.timerSessionTimeOut.Stop();
                this.timerSessionTimeOut.Enabled = false;
                this.Close();
            }
        }

        private async void txtBookCode_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.txtBookCode.Enabled = false;
                this.bookRFID = this.txtBookCode.Text.Trim().ToUpper() ;
                if (!this.bookRFID.StartsWith(Constant.PATRON_CARD_PREFIX) 
                    && this.bookRFID.Length == Constant.TID_LENGTH)
                {
                    if (!bookCodeMap.ContainsKey(this.bookRFID))
                    {
                        numberOfBookScanned++;
                        if (numberOfBookScanned == 1)
                        {
                            this.btDone.Enabled = true;
                        }
                        this.lbInstruction.Text =  "NUMBER OF SCANNED BOOKS: " + numberOfBookScanned.ToString();
                        this.timerSessionTimeOut.Enabled = false;
                        this.spiner.Show();
                        BookScannedResponseModel rs = await BookProcessor.getBookByRfid(this.bookRFID);
                        this.spiner.Hide();
                        this.timerSessionTimeOut.Enabled = true;
                        if (rs.isSuccess)
                        {
                            BookScannedItem item = new BookScannedItem(rs.book);
                            item.Width = this.pnBooksReturned.Width - 10;
                            pnBooksReturned.Controls.Add(item);
                            bookCodeList.Add(this.bookRFID);
                            try
                            {
                                bookCodeMap.Add(this.bookRFID, this.bookRFID);
                            }
                            catch (Exception)
                            {
                            }
                        }
                        else
                        {
                            this.txtBookCode.Enabled = false;
                            using (ModalOK model = new ModalOK(Constant.RESET_TITLE,rs.errorMessage))
                            {
                                model.ShowDialog();
                            }
                            resetReturn();
                        }
                    }

                }
                this.txtBookCode.Text = "";
                this.txtBookCode.Enabled = true;
                this.txtBookCode.Focus();
            }
        }


        private void resetReturn()
        {
            this.btCancel.Show();
            this.timerSessionTimeOut.Enabled = true;
            this.btCancel.Enabled = true;
            this.btDone.Enabled = false;
            this.txtBookCode.Enabled = true;
            this.numberOfBookScanned = 0;
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.bookCodeList.Clear();
            this.pnBooksReturned.Controls.Clear();
            this.bookCodeMap.Clear();
            this.spiner.Hide();
            this.btDone.Text = BT_TXT_RETURN;
            this.lbInstruction.Text = "Place book(s) on the scanner to return";
        }

        private void btDone_Click(object sender, EventArgs e)
        {
            if(this.btDone.Text == BT_TXT_DONE)
            {
                this.Close();
            }
            else if(this.btDone.Text == BT_TXT_RETURN)
            {
                callReturnAPI();
            }
        }

        private async void callReturnAPI()
        {
            this.btCancel.Enabled = false;
            this.btDone.Enabled = false;
            this.pnBooksReturned.Controls.Clear();
            this.timerSessionTimeOut.Enabled = false;
            this.txtBookCode.Enabled = false;
            this.spiner.Show();
            ReturnResponseModel rs = await BookProcessor.returnBooks(bookCodeList);
            this.spiner.Hide();

            if (rs.isSuccess)
            {
                foreach (BookReturnModel b in rs.books)
                {
                    BookReturnItem item = new BookReturnItem(b);
                    item.Width = this.pnBooksReturned.Width - 10;
                    this.pnBooksReturned.Controls.Add(item);
                }
                this.btDone.Text = BT_TXT_DONE;
                this.btDone.Enabled = true;
                this.btCancel.Hide();
                await EmailProcessor.emailReturn(rs.books);
                this.timerSessionTimeOut.Enabled = true;
            }
            else
            {
                this.timerSessionTimeOut.Enabled = true;
                this.txtBookCode.Enabled = false;
                using (ModalOK model = new ModalOK(Constant.RESET_TITLE,rs.errorMessage))
                {
                    model.ShowDialog();
                }
                resetReturn();
            }
        }

        private void lbCancel_Click(object sender, EventArgs e)
        {
            using(ModalYESNO modal = new ModalYESNO("Are you sure you want to cancel?", "Cancel"))
            {
                modal.ShowDialog();
                if(modal.result == DialogResult.Yes)
                {
                    this.Close();
                }
                else
                {
                    this.txtBookCode.Focus();
                    this.timerSessionTimeOut.Enabled = true;
                }
            }
        }
    }
}
