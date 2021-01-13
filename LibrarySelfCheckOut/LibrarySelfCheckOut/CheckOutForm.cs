﻿using System;
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
        private const String BT_TXT_EXIT = "EXIT";

        private string username;

        private int maxNumberBorrowAllowed;

        private long studentId;

        private List<String> bookCodeList;

        private String bookRFID;

        private int sesionTime = 90;

        private int numberOfBookScanned = 0;

        private IDictionary<String, String> bookCodeMap;


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
            this.bookCodeList = new List<String>();
            this.bookCodeMap = new Dictionary<String, String>();
            this.lbUsername.Text = $"Welcome, " + username;
            this.lbNoticeMaxBookBorrowAllowed.Text = $"NOTICE: Each student is allowed to borrow maximum " + maxNumberBorrowAllowed + " books each time.";
            this.lbDate.Text = DateTime.Now.ToString("dddd, dd MMMM yyyy");
        }


        private void txtBookRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                this.bookRFID = this.txtBookRFID.Text.Trim();

                if (!this.bookRFID.StartsWith(Constant.PATRON_CARD_PREFIX))
                {
                    //tranh scan lap lai cung 1 cuon sach
                    if (!bookCodeMap.ContainsKey(this.bookRFID))
                    {
                        this.numberOfBookScanned++;
                        this.lbIntruction.Text = "NUMBER OF SCANNED BOOKS: " + numberOfBookScanned.ToString();
                        //neu bat dau scan thi doi btn
                        if (this.numberOfBookScanned == 1)
                        {
                            this.btDone.Text = BT_TXT_CHECKOUT;
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
                    this.txtBookRFID.Text = "";
                    this.txtBookRFID.Focus();
                }
            }
        }

       
        private void btLogout_Click(object sender, EventArgs e)
        {
            if (this.btDone.Text == BT_TXT_DONE)
            {
                this.Close();
            }
            else if (this.btDone.Text == BT_TXT_EXIT)
            {
                DialogResult rs = MessageBox.Show("Are you sure you want to exit?", "Exit", MessageBoxButtons.YesNo);
                if (rs == DialogResult.Yes)
                {
                    this.Close();
                }
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
            this.bookCodeList.Clear();
            this.bookCodeMap.Clear();
            this.numberOfBookScanned = 0;
            this.txtBookRFID.Enabled = true;
            this.txtBookRFID.Focus();
            this.spiner.Hide();
            this.btDone.Text = BT_TXT_EXIT;
            this.lbIntruction.Text = "Please put your books on the scanner";
        }

        private void callCheckOutAPI()
        {
            this.txtBookRFID.Enabled = false;
            this.timerSession.Enabled = false;
            this.btDone.Enabled = false;
            this.spiner.Show();
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
                    this.lbNoticeMaxBookBorrowAllowed.Hide();
                    this.pnReturnSt.Show();
                    this.btDone.Text = BT_TXT_DONE;
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
            this.timerSession.Enabled = true;
            this.btDone.Enabled = true;
            this.spiner.Hide();
        }

    }
}
