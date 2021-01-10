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

namespace LibrarySelfCheckOut
{
    public partial class CheckOutForm : Form
    {
        private string username;

        private int maxNumberBorrowAllowed;

        private long studentId;

        private List<long> bookCodeList;

        private long bookRFID;

        private int sesionTime = 90;

        private int numberOfBookScanned = 0;

        private bool wasCallAPI = false;

        private IDictionary<long, long> bookCodeMap;


        public CheckOutForm(string username, int maxNumberBorrowAllowed, long studentId)
        {
            InitializeComponent();
            this.username = username;
            this.maxNumberBorrowAllowed = maxNumberBorrowAllowed;
            this.studentId = studentId;
            this.spiner.Hide();

            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
            this.lbSession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.pnReturnSt.Hide();
            this.txtBookRFID.Focus();

            //assign value
            this.bookCodeList = new List<long>();
            this.bookCodeMap = new Dictionary<long, long>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbNoticeMaxBookBorrowAllowed.Text = $"NOTICE: Each student is allowed to borrow maximum " + maxNumberBorrowAllowed + " books each time.";
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");


        }


        private void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    this.bookRFID = long.Parse(this.txtBookRFID.Text);
                    if (!bookCodeMap.ContainsKey(this.bookRFID))
                    {
                        this.numberOfBookScanned++;
                        //neu bat dau scan thi auto call api sau 5s
                        if (this.numberOfBookScanned == 1)
                        {
                            this.timerAutoCallApi.Enabled = true;
                            this.timerAutoCallApi.Start();
                            this.spiner.Show();
                        }
                        if (bookCodeList.Count >= maxNumberBorrowAllowed)
                        {
                            //show message box ok
                            resetState();
                            MessageBox.Show($"You can't borrow more than " + maxNumberBorrowAllowed + " books. Please scan again!", "Maximum Book Borrow Allowed");
                        }
                        else
                        {
                            bookCodeMap.Add(this.bookRFID, this.bookRFID);
                            bookCodeList.Add(this.bookRFID);
                        }
                    }
                }
                catch (FormatException)
                {
                }
                this.txtBookRFID.Text = "";
                this.txtBookRFID.Focus();
            }
        }

       
        private void btLogout_Click(object sender, EventArgs e)
        {
            this.timerSession.Stop();
            this.timerSession.Enabled = false;
            this.Close();
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

        private void timerAutoCallApi_Tick(object sender, EventArgs e)
        {
            Console.WriteLine("tick rồi");
            if (wasCallAPI == false)
            {
                this.txtBookRFID.Enabled = false;
                this.wasCallAPI = true;
                CheckOutResponseModel rs = BookProcessor.checkout(bookCodeList, studentId);
                if (rs.isSuccess)
                {
                    this.spiner.Hide();
                    if (rs.canBorrowAll)
                    {
                        int count = 0;
                        //show return at
                        foreach (BookModel b in rs.books)
                        {
                            count++;
                            BookItem item = new BookItem(count, b);
                            item.Width = flowLayoutPanelBookList.Width - 10;
                            this.flowLayoutPanelBookList.Controls.Add(item);
                        }
                        this.lbReturnNotice.Text = "Check out successfully. Please return before: " + rs.dueDate;
                        this.pnReturnSt.Show();
                    }
                    else
                    {
                        //khi co sach ko duoc muon
                        resetState();
                        string msg = "You're not allowed to borrow: " + string.Join(",", rs.books.Select(b => b.title)) + ". Please scan again!";
                        DialogResult dialogResult = MessageBox.Show(msg, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);

                    }
                }
                else
                {
                    resetState();
                    MessageBox.Show(rs.errorMessage, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);

                }
            }
        }

        private void resetState()
        {
            this.bookCodeList.Clear();
            this.numberOfBookScanned = 0;
            this.txtBookRFID.Enabled = true;
            this.txtBookRFID.Focus();
            this.timerAutoCallApi.Enabled = false;
            this.wasCallAPI = false;
            this.timerAutoCallApi.Enabled = false;
            this.spiner.Hide();
            this.bookCodeMap.Clear();

        }
    }
}
