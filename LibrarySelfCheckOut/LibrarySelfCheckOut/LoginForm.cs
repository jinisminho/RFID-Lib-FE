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

        public LoginForm()
        {
            InitializeComponent();
            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
            this.sesionTime = 30;
      
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            this.txtStudentRFID.Focus();
            this.lbMessage.Hide();
            this.txtPass.Hide();
            this.lbPin.Hide();
            this.lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.sessionTimer.Start();
        }

     
        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                try
                {
                    studentFRID = long.Parse(this.txtStudentRFID.Text);

                }
                catch (FormatException)
                {

                }
                this.txtPass.Show();
                this.lbPin.Show();
                this.txtPass.Focus();
            }
        }


        private void txtPass_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                try
                {
                    pin = long.Parse(this.txtPass.Text);
                }
                catch (FormatException)
                { 

                }
                AuthStudentModel student = AuthProcessor.checkLogin(studentFRID, pin);
                if(student == null || (student !=null && student.role != "ROLE_STUDENT") || (student != null && student.status == "DEACTIVE"))
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
                else
                {
                    if(student.status == "NOT_RETURN")
                    {
                        MessageBox.Show("Please contact librarian to return over due books and pay fine to unblock your account", "Account Blocked", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    }
                    else
                    {
                        long studentId = student.id;
                        string studentUsername = student.username;
                        int maxNumberBorrowAllowed = student.maxNumberBorrowAllowed;
                        this.sessionTimer.Stop();
                        this.sessionTimer.Enabled = false;
                        CheckOutForm checkOutForm = new CheckOutForm(studentUsername, maxNumberBorrowAllowed, studentId);
                        checkOutForm.ShowDialog();
                        this.Close();

                    }
                }

                this.txtStudentRFID.Text = "";
                this.txtPass.Text = "";
                this.txtStudentRFID.Focus();
                this.txtPass.Hide();
                this.lbPin.Hide();
            }
        }

        private async void checkLogin(long studentRFID)
        {
            this.txtStudentRFID.Text = "";
            this.txtStudentRFID.Focus();
            AuthStudentModel student = await AuthProcessor.checkLoginAPI(studentRFID);
            if (student != null) //check RFID duoi db where activate + student role
            {
                //tim thay chuyen form kem theo 2 param student id + username
                long studentId = student.id;
                string studentUsername = student.username;
                int maxNumberBorrowAllowed = student.maxNumberBorrowAllowed;
                CheckOutForm checkOutForm = new CheckOutForm(studentUsername, maxNumberBorrowAllowed, studentId);
                checkOutForm.ShowDialog();

            }
            else //khong tim thay student
            {
                this.lbMessage.Show();
                this.txtStudentRFID.Focus();
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
    } 
}
