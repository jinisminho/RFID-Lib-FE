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

        private List<BookModel> bookList;

        private List<long> bookCodeList;

        private long bookRFID;

        private int sesionTime = 60;

        private int numberOfBookScanned = 0;

        private bool wasCallAPI = false;


        public CheckOutForm(string username, int maxNumberBorrowAllowed, long studentId)
        {
            InitializeComponent();
            this.username = username;
            this.maxNumberBorrowAllowed = maxNumberBorrowAllowed;
            this.studentId = studentId;

            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
            this.lbSession.Text = "SESSION TIMEOUT: " + this.sesionTime;


            this.txtBookRFID.Focus();

            //assign value
            this.bookList = new List<BookModel>();
            this.bookCodeList = new List<long>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbNoticeMaxBookBorrowAllowed.Text = $"NOTICE: Each student is allowed to borrow maximum " + maxNumberBorrowAllowed + " books each time.";
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");


        }


        private void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.numberOfBookScanned += 1;
                Console.WriteLine(this.numberOfBookScanned);

                //neu bat dau scan thi auto call api sau 5s
                if (this.numberOfBookScanned == 1)
                {
                    this.timerAutoCallApi.Enabled = true;
                    this.timerAutoCallApi.Start();
                }


                this.bookRFID = long.Parse(this.txtBookRFID.Text);
                this.txtBookRFID.Text = "";
                this.txtBookRFID.Focus();
                if (bookCodeList.Count >= maxNumberBorrowAllowed)
                {
                    //show message box ok
                    this.timerAutoCallApi.Enabled = false;
                    MessageBox.Show($"You can't borrow more than " + maxNumberBorrowAllowed + " books", "Maximum Book Borrow Allowed");
                }
                else
                {
                    bookCodeList.Add(this.bookRFID);
                }
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
            if (wasCallAPI == false)
            {
                Console.WriteLine("Timer start call api");
                wasCallAPI = true;
                CheckOutResponseModel rs = BookProcessor.checkout(bookCodeList);
                if (rs.isSuccess)
                {
                    if (rs.canBorrowAll)
                    {
                        int count = 0;
                        //show return at
                        foreach (BookModel b in rs.books)
                        {
                            count++;
                            BookItem item = new BookItem(count, b);
                            item.Width = flowLayoutPanelBookList.Width;
                            this.flowLayoutPanelBookList.Controls.Add(item);
                            this.txtBookRFID.Enabled = false;
                        }
                    }
                    else
                    {
                        this.timerAutoCallApi.Enabled = false;
                        string msg = "You're not allowed to borrow: " + string.Join(",", rs.books.Select(b => b.title)) + ".";
                        DialogResult dialogResult = MessageBox.Show(msg, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                        this.wasCallAPI = false;

                    }
                }
                else
                {
                    //bao loi
                    this.wasCallAPI = false;
                    this.timerAutoCallApi.Enabled = false;
                    MessageBox.Show("systemr", "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
              
               
            
        }

    }
}
