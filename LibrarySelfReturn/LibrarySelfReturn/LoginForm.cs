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
    public partial class LoginForm : Form
    {
        private long studentFRID;

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

        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                studentFRID = long.Parse(this.txtStudentRFID.Text);
                this.txtStudentRFID.Text = "";
                if (AuthProcessor.checkLogin(studentFRID).Equals("valid"))
                {
                    ReturnForm returnForm = new ReturnForm("tramphse130038@fpt.edu.com", 1);
                    returnForm.ShowDialog();
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
        }

        private async void checkLogin(long studentRFID)
        {
            this.txtStudentRFID.Text = "";
            this.txtStudentRFID.Focus();
            AuthStudentModel student = await AuthProcessor.checkLoginAPI(studentRFID);
            if (student != null) //check RFID duoi db where activate + student role
            {
                //tim thay chuyen form kem theo 2 param student id + username
                var studentId = student.id;
                var studentUsername = student.username;
                ReturnForm returnForm = new ReturnForm(studentUsername,studentId);
                returnForm.ShowDialog();
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
