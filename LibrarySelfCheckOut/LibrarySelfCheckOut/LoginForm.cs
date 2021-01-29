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
            this.sesionTime = Constant.LOGIN_SESSION_TIME_OUT;
      
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            this.txtStudentRFID.Focus();
            this.lbMessage.Hide();
            this.lbsession.Text = "SESSION TIMEOUT: " + this.sesionTime;
            this.sessionTimer.Start();
            this.spinner.Hide();
            int x = (pnCenter.Width + pnLeft.Width - lbScan.Width) / 2;
            lbScan.Location = new Point(x, lbScan.Location.Y);
            lbMessage.Location = new Point(x, lbMessage.Location.Y);
            int yLogo = (pnLeft.Height - pcLogo.Height) / 2;
            int yTitle = (pnLeft.Height - picTitle.Height) / 2;
            pcLogo.Location = new Point(pcLogo.Location.X, yLogo - 50);
            picTitle.Location = new Point(picTitle.Location.X, yTitle + 25);
        }

     
        private async void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                this.txtStudentRFID.Enabled = false;
                studentFRID = this.txtStudentRFID.Text.Trim().ToUpper();
                if (studentFRID.StartsWith(Constant.PATRON_CARD_PREFIX))
                {
                    this.sessionTimer.Enabled = false;
                    this.spinner.Show();
                    AuthResponse rs = await AuthProcessor.checkLogin(studentFRID.Replace(Constant.PATRON_CARD_PREFIX, ""));
                    this.spinner.Hide();
                    if (rs.isSuccess)
                    {
                        if (rs.student == null || (rs.student != null && rs.student.role != "ROLE_PATRON"))
                        {
                            incorrectCount++;
                            showIvalidStudentCard();
                            this.txtStudentRFID.Enabled = true;
                            this.txtStudentRFID.Text = "";
                            this.txtStudentRFID.Focus();
                        }
                        else
                        {
                            if (rs.student.overDue == true)
                            {
                                using (ModalOK model = new ModalOK("Please return over dued book(s) at the librarian counter to continue borrowing book"))
                                {
                                    model.ShowDialog();
                                }
                                this.Close();
                            }
                            else
                            {

                                int studentId = rs.student.id;
                                string studentUsername = rs.student.username;
                                CheckOutForm checkOutForm = new CheckOutForm(studentUsername,studentId);
                                checkOutForm.ShowDialog();
                                this.sessionTimer.Enabled = false;
                                resetLogin();
                                this.Close();
                            }
                        }
                    }
                    else
                    {
                        //http khac ok
                        using (ModalOK model = new ModalOK(rs.msg))
                        {
                            model.ShowDialog();
                        }
                        resetLogin();
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

   

        private void resetLogin()
        {
            this.txtStudentRFID.Enabled = true;
            this.sessionTimer.Enabled = true;
            this.txtStudentRFID.Text = "";
            this.txtStudentRFID.Focus();
            this.spinner.Hide();
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

        private void panel2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    } 
}
