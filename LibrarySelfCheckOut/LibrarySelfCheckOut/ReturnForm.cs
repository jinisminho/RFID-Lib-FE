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


        private int sesionTime = 90;

        private List<String> bookCodeList;

        private String bookRFID;

        private int numberOfBookScanned = 0;

        private IDictionary<String, String> bookCodeMap;


        public ReturnForm()
        {
            InitializeComponent();
            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
            this.spiner.Hide();
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.lbSessionTimeOut.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.bookCodeList = new List<String>();
            this.bookCodeMap = new Dictionary<String, String>();
            this.btDone.Enabled = false;
            this.btDone.Text = BT_TXT_RETURN;
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

        private void txtBookCode_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.bookRFID = this.txtBookCode.Text.Trim();
                if (!this.bookRFID.StartsWith(Constant.PATRON_CARD_PREFIX) 
                    && this.bookRFID.Length == Constant.TID_LENGTH)
                {
                    if (!bookCodeMap.ContainsKey(this.bookRFID))
                    {
                        numberOfBookScanned++;
                        this.lbInstruction.Text =  "NUMBER OF SCANNED BOOKS: " + numberOfBookScanned.ToString();
                        this.timerSessionTimeOut.Enabled = false;
                        BookScannedResponseModel rs = BookProcessor.getBookByRfid(this.bookRFID);
                        if (rs.isSuccess)
                        {
                            BookScannedItem item = new BookScannedItem(numberOfBookScanned, rs.book.title);
                            item.Width = this.pnBooksReturned.Width - 10;
                            pnBooksReturned.Controls.Add(item);
                            bookCodeList.Add(this.bookRFID);
                            bookCodeMap.Add(this.bookRFID, this.bookRFID);
                        }
                        else
                        {
                            this.txtBookCode.Enabled = false;
                            using (ModalOK model = new ModalOK(rs.errorMessage))
                            {
                                model.ShowDialog();
                            }
                            resetReturn();
                        }
                        if(numberOfBookScanned == 1)
                        {
                            this.btDone.Enabled = true;
                        }
                        this.timerSessionTimeOut.Enabled = true;
                    }

                }
                this.txtBookCode.Text = "";
                this.txtBookCode.Focus();
            }
        }


        private void resetReturn()
        {
            this.pnBooksReturned.Controls.Clear();
            this.btCancel.Enabled = true;
            this.btDone.Enabled = false;
            this.txtBookCode.Enabled = true;
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.bookCodeList.Clear();
            this.numberOfBookScanned = 0;
            this.bookCodeMap.Clear();
            this.btDone.Text = BT_TXT_RETURN;
            this.spiner.Hide();
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

        private void callReturnAPI()
        {
            this.btCancel.Enabled = false;
            this.pnBooksReturned.Controls.Clear();
            this.timerSessionTimeOut.Enabled = false;
            this.btDone.Enabled = false;
            this.spiner.Show();
            this.txtBookCode.Enabled = false;
            //call api
            ReturnResponseModel rs = BookProcessor.returnBooks(bookCodeList);
            if (rs.isSuccess)
            {
                int count = 0;
                foreach (BookReturnModel b in rs.books)
                {
                    count++;
                    BookReturnItem item = new BookReturnItem(count, b.title, b.status);
                    item.Width = this.pnBooksReturned.Width - 10;
                    this.pnBooksReturned.Controls.Add(item);
                }
                this.btDone.Text = BT_TXT_DONE;
            }
            else
            {
                this.txtBookCode.Enabled = false;
                using (ModalOK model = new ModalOK(rs.errorMessage))
                {
                    model.ShowDialog();
                }
                resetReturn();
            }
            this.timerSessionTimeOut.Enabled = true;
            this.btDone.Enabled = true;
            this.spiner.Hide();
        }

        private void lbCancel_Click(object sender, EventArgs e)
        {
            using(ModalYESNO modal = new ModalYESNO("Are you sure you want to cancel?"))
            {
                modal.ShowDialog();
                if(modal.result == DialogResult.Yes)
                {
                    this.Close();
                }
            }
        }
    }
}
