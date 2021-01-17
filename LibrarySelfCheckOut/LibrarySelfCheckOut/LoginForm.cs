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
    public partial class LoginForm : Form
    {

        private String studentFRID;
        private int sesionTime;
        private int incorrectCount = 0;

        public LoginForm()
        {
            InitializeComponent();
            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
            this.sesionTime = 60;
      
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            this.txtStudentRFID.Focus();
            this.lbMessage.Hide();
            this.lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.sessionTimer.Start();
            this.lbIncorrectPin.Hide();
        }

     
        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                this.txtStudentRFID.Enabled = false;
                studentFRID = this.txtStudentRFID.Text.Trim();
                if (studentFRID.StartsWith(Constant.PATRON_CARD_PREFIX))
                {
                    this.sessionTimer.Enabled = false;
                    AuthStudentModel student = AuthProcessor.checkLogin(studentFRID.Replace(Constant.PATRON_CARD_PREFIX, ""));
                    if (student == null || (student != null && student.role != "ROLE_PATRON") || (student != null && student.status == "DEACTIVE"))
                    {
                        incorrectCount++;
                        showIvalidStudentCard();
                        this.txtStudentRFID.Enabled = true;
                        this.txtStudentRFID.Text = "";
                        this.txtStudentRFID.Focus();
                    }
                    else
                    {
                        if (student.status == "NOT_RETURN")
                        {
                            using (ModalOK model = new ModalOK("Please return over dued book(s) at the librarian counter to continue borrowing book"))
                            {
                                model.ShowDialog();
                            }
                            this.Close();
                        }
                        else
                        {
                            
                            long studentId = student.id;
                            string studentUsername = student.username;
                            int maxNumberBorrowAllowed = student.maxNumberBorrowAllowed;
                            CheckOutForm checkOutForm = new CheckOutForm(studentUsername, maxNumberBorrowAllowed, studentId);
                            checkOutForm.ShowDialog();
                            this.sessionTimer.Enabled = false;
                            resetLogin();
                            this.Close();
                        }
                    }
                    this.sessionTimer.Enabled = true;
                }
                else
                {
                    showIvalidStudentCard();
                    resetLogin();
                }

            }
        }


      
       

        private void sessionTimer_Tick(object sender, EventArgs e)
        {
            this.sesionTime -= 1;
            this.lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            if(this.sesionTime == 0)
            {
                this.sessionTimer.Stop();
                this.sessionTimer.Enabled = false;
                this.Close();
            }
        }

        private void btBack_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void resetLogin()
        {
            this.txtStudentRFID.Enabled = true;
            this.sessionTimer.Enabled = true;
            this.txtStudentRFID.Text = "";
            this.txtStudentRFID.Focus();
        }


        private void showIvalidStudentCard()
        {
            this.lbMessage.Text = "INVALID USER PLEASE SCAN AGAIN";
            this.lbMessage.Show();
            var t = new Timer();
            t.Interval = 2000;
            t.Tick += (s, d) =>
            {
                this.lbMessage.Hide();
                if (this.incorrectCount == 3)
                {
                    this.Close();
                }
                t.Stop();
            };
            t.Start();
        }
    } 
}
