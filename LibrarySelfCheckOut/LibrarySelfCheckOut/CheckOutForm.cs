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
    public partial class CheckOutForm : Form
    {

        private const String BT_TXT_DONE = "DONE";
        private const String BT_TXT_CHECKOUT = "CHECK OUT";

        private string username;

        private int maxNumberBorrowAllowed;

        private int studentId;

        private List<String> bookCodeList;

        private String bookRFID;

        private int sesionTime = Constant.PROCESS_SESSION_TIME_OUT;

        private int numberOfBookScanned = 0;

        private IDictionary<String, String> bookCodeMap;


        public CheckOutForm(string username, int maxNumberBorrowAllowed, int studentId)
        {
            InitializeComponent();
            this.username = username;
            this.maxNumberBorrowAllowed = maxNumberBorrowAllowed;
            this.studentId = studentId;
            this.spiner.Hide();

            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;
            this.lbSession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.txtBookRFID.Focus();

            //assign value
            this.bookCodeList = new List<String>();
            this.bookCodeMap = new Dictionary<String, String>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbNoticeMaxBookBorrowAllowed.Text = $"NOTICE: Each student is allowed to borrow maximum " + maxNumberBorrowAllowed + " books each time.";
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");

            this.btDone.Enabled = false;
            this.btDone.Text = BT_TXT_CHECKOUT;
        }


        private async void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.bookRFID = this.txtBookRFID.Text.Trim();

                if (!this.bookRFID.StartsWith(Constant.PATRON_CARD_PREFIX) 
                    && this.bookRFID.Length == Constant.TID_LENGTH) 
                {
                    //tranh scan lap lai cung 1 cuon sach
                    if (!bookCodeMap.ContainsKey(this.bookRFID))
                    {
                        this.numberOfBookScanned++;
                        this.lbIntruction.Text = "NUMBER OF SCANNED BOOKS: " + numberOfBookScanned.ToString();                   
                        if ( numberOfBookScanned > maxNumberBorrowAllowed)
                        {
                            this.txtBookRFID.Enabled = false;
                            using (ModalOK model = new ModalOK($"You can't borrow more than " + maxNumberBorrowAllowed + " books. Please scan again!"))
                            {
                                model.ShowDialog();
                            }
                            resetState();
                        }
                        else
                        {
                            this.timerSession.Enabled = false;
                            this.spiner.Show();
                            BookScannedResponseModel rs = await BookProcessor.getBookByRfid(this.bookRFID);
                            this.spiner.Hide();
                            if (rs.isSuccess)
                            {
                                BookScannedItem item = new BookScannedItem(rs.book);
                                item.Width = this.flowLayoutPanelBookList.Width - 10;
                                flowLayoutPanelBookList.Controls.Add(item);
                                bookCodeList.Add(this.bookRFID);
                                bookCodeMap.Add(this.bookRFID, this.bookRFID);
                            }
                            else
                            {
                                this.txtBookRFID.Enabled = false;
                                using (ModalOK model = new ModalOK(rs.errorMessage))
                                {
                                    model.ShowDialog();
                                }
                                resetState();
                            }
                            this.timerSession.Enabled = false;
                        }
                        if (this.numberOfBookScanned == 1)
                        {
                            this.btDone.Enabled = true;
                        }
                    }
                }
                this.txtBookRFID.Text = "";
                this.txtBookRFID.Focus();
            }
        }

       
        private void btLogout_Click(object sender, EventArgs e)
        {
            if (this.btDone.Text == BT_TXT_DONE)
            {
                this.Close();
            }
            else if (this.btDone.Text == BT_TXT_CHECKOUT)
            {
                callCheckOutAPI();
            }
        }

        private void sessionTimer_Tick(object sender, EventArgs e)
        {
            this.sesionTime -= 1;
            this.lbSession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            if (this.sesionTime == 0)
            {
                this.timerSession.Stop();
                this.timerSession.Enabled = false;
                this.Close();
            }
        }


        private void resetState()
        {
            this.flowLayoutPanelBookList.Controls.Clear();
            this.btCancel.Enabled = true;
            this.btDone.Enabled = false;
            this.bookCodeList.Clear();
            this.bookCodeMap.Clear();
            this.numberOfBookScanned = 0;
            this.txtBookRFID.Enabled = true;
            this.txtBookRFID.Focus();
            this.spiner.Hide();
            this.btDone.Text = BT_TXT_CHECKOUT;
            this.lbIntruction.Text = "Place book(s) on the scanner to check out";
        }

        private async void callCheckOutAPI()
        {
            this.btCancel.Enabled = false;
            this.flowLayoutPanelBookList.Controls.Clear();
            this.txtBookRFID.Enabled = false;
            this.timerSession.Enabled = false;
            this.btDone.Enabled = false;
            this.spiner.Show();
            CheckOutResponseModel rs =  await BookProcessor.checkout(bookCodeList, studentId);
            this.spiner.Hide();
            if (rs.isSuccess)
            {
                this.spiner.Hide();
                int count = 0;
                //show return at
                foreach (BookCheckOutModel b in rs.books)
                {
                    count++;
                    BookItem item = new BookItem(count, b);
                    item.Width = flowLayoutPanelBookList.Width - 10;
                    this.flowLayoutPanelBookList.Controls.Add(item);
                }
                this.lbNoticeMaxBookBorrowAllowed.Hide();
                this.btDone.Text = BT_TXT_DONE;
            }
            else
            {
                this.txtBookRFID.Enabled = false;
                using (ModalOK model = new ModalOK(rs.errorMessage))
                {
                    model.ShowDialog();
                }
                resetState();
            }
            this.timerSession.Enabled = true;
            this.btDone.Enabled = true;
        }

        private void btCancel_Click(object sender, EventArgs e)
        {
            using (ModalYESNO modal = new ModalYESNO("Are you sure you want to cancel?"))
            {
                modal.ShowDialog();
                if (modal.result == DialogResult.Yes)
                {
                    this.Close();
                }
                else
                {
                    this.txtBookRFID.Focus();
                    this.timerSession.Enabled = true;
                }
            }
        }
    }
}
