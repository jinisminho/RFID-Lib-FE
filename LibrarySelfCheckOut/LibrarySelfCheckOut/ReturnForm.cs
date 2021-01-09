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
    public partial class ReturnForm : Form
    {
        private int sesionTime = 90;

        private List<long> bookCodeList;

        private long bookRFID;

        private int numberOfBookScanned = 0;

        private bool wasCallAPI = false;

        public ReturnForm()
        {
            InitializeComponent();
            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
           // this.spiner.Hide();
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.lbSessionTimeOut.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.bookCodeList = new List<long>();
        }

        private void timerCallReturnAPI_Tick(object sender, EventArgs e)
        {
            if (wasCallAPI == false)
            {
                Console.WriteLine("call api");
                this.spiner.Hide();
                this.txtBookCode.Enabled = false;
                this.wasCallAPI = true;
                //call api
                ReturnResponseModel rs = BookProcessor.returnBooks(bookCodeList);
                if (rs.isSuccess)
                {
                    int count = 0;
                    foreach (BookReturnModel b in rs.books)
                    {
                        count++;
                        BookReturnItem item = new BookReturnItem(count, b.username, b.title);
                        item.Width = this.pnBooksReturned.Width - 10;
                        this.pnBooksReturned.Controls.Add(item);
                    }
                }
                else
                {
                    resetReturn();
                    MessageBox.Show(rs.errorMessage, "ERROR", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                this.timerCallReturnAPI.Enabled = false;
            }
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
                Console.WriteLine("enter");
                numberOfBookScanned++;
                try
                {
                    this.bookRFID = long.Parse(this.txtBookCode.Text);
                    if (this.numberOfBookScanned == 1)
                    {
                        Console.WriteLine("tang");
                        this.timerCallReturnAPI.Enabled = true;
                        this.timerCallReturnAPI.Start();
                        this.spiner.Show();
                    }
                    bookCodeList.Add(this.bookRFID);
                }
                catch (FormatException)
                {
                }
                this.txtBookCode.Text = "";
                this.txtBookCode.Focus();

            }
        }


        private void resetReturn()
        {
            this.txtBookCode.Enabled = true;
            this.txtBookCode.Text = "";
            this.txtBookCode.Focus();
            this.timerCallReturnAPI.Enabled = false;
            this.bookCodeList.Clear();
            this.numberOfBookScanned = 0;
            this.spiner.Hide();
            this.wasCallAPI = false;
        }

        private void btDone_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
