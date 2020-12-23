using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibrarySelfReturn.Models;
using LibrarySelfReturn.Processors;

namespace LibrarySelfReturn
{
    public partial class ReturnForm : Form
    {
        private string username;

        private long studentId;

        private List<BookReturnModel> bookList;

        private long bookRFID;

        private string transactionId;
        public ReturnForm(string username, long studentId)
        {
            InitializeComponent();
            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;

            this.transactionId = "ST" + DateTime.Now.ToString("MMddyyyyHHmmss");
            Console.WriteLine(transactionId);
            this.username = username;
            this.studentId = studentId;
            this.txtBookRFID.Focus();

            //assign value
            this.bookList = new List<BookReturnModel>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");
        }

        private async void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.bookRFID = long.Parse(this.txtBookRFID.Text);
                this.txtBookRFID.Text = "";
                this.txtBookRFID.Focus();
                //call api đổi status hien len panel
                BookReturnModel book = await BookReturnProcessor.returnABook(this.bookRFID, this.studentId, transactionId);
                if(book == null)
                {
                    MessageBox.Show("System Error. Please try again", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);

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

        private async void btLogout_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("Are you sure you want to logout?", "LOGOUT", MessageBoxButtons.YesNo, MessageBoxIcon.Information);
            if (dialogResult == DialogResult.Yes)
            {
                String msg = await BookReturnProcessor.sendEmailForReturnTransaction(transactionId);
                if (msg != null && msg != "failed")
                {
                    this.Close();
                }
                else
                {
                    MessageBox.Show("Please try again", "System Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else if (dialogResult == DialogResult.No)
            {
            }
        }
    }
}
