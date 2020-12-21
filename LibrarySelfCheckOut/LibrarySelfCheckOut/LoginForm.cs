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

        private string studentFRID;
        public LoginForm()
        {
            InitializeComponent();
            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;
      
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            this.txtStudentRFID.Focus();
            this.lbMessage.Hide();

        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            this.txtStudentRFID.Text = "";
            if (AuthProcessor.checkLogin(studentFRID).Equals("valid"))
            {
               //chuyen trang
            }
            else
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

        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                studentFRID = this.txtStudentRFID.Text;
                btnLogin.PerformClick();
            }
        }


        //with api
        private async void checkLogin(string studentRFID)
        {
            this.txtStudentRFID.Text = "";
            Student student = await AuthProcessor.checkLoginAPI(studentRFID);
            if(student != null) //check RFID duoi db where activate + student role
            {
                //tim thay chuyen form kem theo 2 param student id + username
                var studentId = student.id;
                var studentUsername = student.username;

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
    } 
}
