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
        public LoginForm()
        {
            InitializeComponent();
            //this.TopMost = true;
            //this.FormBorderStyle = FormBorderStyle.None;
            //this.WindowState = FormWindowState.Maximized;
      
        }

        private void LoginForm_Load(object sender, EventArgs e)
        {
            this.txtStudentRFID.Focus();
            this.lbMessage.Hide();

        }

     
        private void txtStudentRFID_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter)
            {
                studentFRID = long.Parse(this.txtStudentRFID.Text);
                this.txtStudentRFID.Text = "";
                this.txtStudentRFID.Focus();

                if (AuthProcessor.checkLogin(studentFRID).Equals("valid"))
                {
                    CheckOutForm checkOutForm = new CheckOutForm("tramphse130038@fpt.edu.com", 4 , 1);
                    checkOutForm.ShowDialog();
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


        //with api
        private async void checkLogin(long studentRFID)
        {
            this.txtStudentRFID.Text = "";
            this.txtStudentRFID.Focus();
            AuthStudentModel student = await AuthProcessor.checkLoginAPI(studentRFID);
            if(student != null) //check RFID duoi db where activate + student role
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
    } 
}
