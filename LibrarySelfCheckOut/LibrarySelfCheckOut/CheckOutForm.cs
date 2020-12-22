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


        private long bookRFID;

        public CheckOutForm(string username, int maxNumberBorrowAllowed, long studentId)
        {
            InitializeComponent();
            this.username = username;
            this.maxNumberBorrowAllowed = maxNumberBorrowAllowed;
            this.studentId = studentId;

            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;

            this.txtBookRFID.Focus();

            //assign value
            this.bookList = new List<BookModel>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbNoticeMaxBookBorrowAllowed.Text = $"NOTICE: Each student is allowed to borrow maximum " + maxNumberBorrowAllowed + " books each time.";
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");


        }


        private async void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.bookRFID = long.Parse(this.txtBookRFID.Text);
                this.txtBookRFID.Text = "";
                this.txtBookRFID.Focus();
                if (bookList.Count >= maxNumberBorrowAllowed)
                {
                    //show message box ok
                    MessageBox.Show($"You can't borrow more than " + maxNumberBorrowAllowed + " books", "Maximum Book Borrow Allowed");
                }
                else
                {
                    //call api
                    BookModel book = await BookProcessor.findBookByRFID(this.bookRFID);
                    if (book == null)
                    {
                        MessageBox.Show("Cannot find this book in the system", "Book Not Found");

                    }
                    else
                    {
                        bookList.Add(book);
                        BookItem bookItem = new BookItem(bookList.Count, book);
                        bookItem.Width = this.flowLayoutPanelBookList.Width - 30;
                        this.flowLayoutPanelBookList.Controls.Add(bookItem);
                    }
                }
                 
            }
        }

        private void btnFinish_Click(object sender, EventArgs e)
        {
            Success_Form successForm = new Success_Form();
            successForm.ShowDialog();
            this.Close();
           
        }
    }
}
