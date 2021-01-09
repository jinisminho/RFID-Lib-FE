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
    public partial class LoginForm : Form
    {

        private long studentFRID;
        private long pin;
        private int sesionTime;
        private int incorrectPinCount = 0;

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
            this.txtPass.Hide();
            this.lbPin.Hide();
            this.lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.sessionTimer.Start();
            this.lbIncorrectPin.Hide();
        }

     
        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                try
                {
                    studentFRID = long.Parse(this.txtStudentRFID.Text);
                    AuthStudentModel student = AuthProcessor.checkLogin(studentFRID);
                    if (student == null || (student != null && student.role != "ROLE_STUDENT") || (student != null && student.status == "DEACTIVE"))
                    {
                        showIvalidStudentCard();
                        this.txtStudentRFID.Text = "";
                        this.txtStudentRFID.Focus();
                    }
                    else
                    {
                        if (student.status == "NOT_RETURN")
                        {
                            DialogResult dialog =  MessageBox.Show("Please contact librarian to return over due books and pay fine to unblock your account", "Account Blocked", MessageBoxButtons.OK, MessageBoxIcon.Information);
                            if(dialog == DialogResult.OK)
                            {
                                this.Close();
                            }
                        }
                        else
                        {
                            this.txtPass.Focus();
                            this.txtPass.Show();
                            this.lbPin.Show();
                            this.txtStudentRFID.Enabled = false;

                        }
                    }
                }
                catch (FormatException)
                {
                    this.txtStudentRFID.Text = "";
                    this.txtStudentRFID.Focus();
                }
               
            }
        }


        private void txtPass_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                if(this.txtPass.Text.Length > 0)
                {
                    try
                    {
                        pin = long.Parse(this.txtPass.Text);
                        AuthStudentModel student = AuthProcessor.checkLogin(studentFRID, pin);
                        if (student == null)
                        {
                            showInvalidPINMsg();
                        }
                        else
                        {
                            long studentId = student.id;
                            string studentUsername = student.username;
                            int maxNumberBorrowAllowed = student.maxNumberBorrowAllowed;
                            CheckOutForm checkOutForm = new CheckOutForm(studentUsername, maxNumberBorrowAllowed, studentId);
                            checkOutForm.ShowDialog();
                            resetLogin();
                            this.Close();
                        }

                    }
                    catch (FormatException)
                    {
                        showInvalidPINMsg();
                    }
                }
                else
                {
                    showInvalidPINMsg();
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
            this.txtStudentRFID.Text = "";
            this.txtPass.Text = "";
            this.txtStudentRFID.Focus();
            this.txtPass.Hide();
            this.lbPin.Hide();
            this.txtStudentRFID.Enabled = true;
        }

        private void showInvalidPINMsg()
        {
            this.incorrectPinCount++;
            this.lbIncorrectPin.Text = "INCORRECT PIN PLEASE TRY AGAIN";
            this.lbIncorrectPin.Show();
            var t = new Timer();
            t.Interval = 2500;
            t.Tick += (s, d) =>
            {
                this.lbIncorrectPin.Hide();
                if (this.incorrectPinCount == 3)
                {
                    this.Close();
                }
                t.Stop();
            };
            t.Start();
           
            this.txtPass.Text = "";
            this.txtPass.Focus();
        }

        private void showIvalidStudentCard()
        {
            this.lbMessage.Text = "INVALID STUDENT CARD PLEASE SCAN AGAIN";
            this.lbMessage.Show();
            var t = new Timer();
            t.Interval = 2500;
            t.Tick += (s, d) =>
            {
                this.lbMessage.Hide();
                t.Stop();
            };
            t.Start();
        }
    } 
}
