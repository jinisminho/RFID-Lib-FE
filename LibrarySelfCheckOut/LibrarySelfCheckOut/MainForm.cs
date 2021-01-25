using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LibrarySelfCheckOut
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
            this.TopMost = true;
            this.FormBorderStyle = FormBorderStyle.None;
            this.WindowState = FormWindowState.Maximized;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            int x = (lbWelcome.Width - lbWelcome.Width) / 2;
            lbWelcome.Location = new Point(x, lbWelcome.Location.Y);
        }

        private void lbBorrow_Click(object sender, EventArgs e)
        {
            openLoginForm();
        }

    

        private void pcBorrow_Click(object sender, EventArgs e)
        {
            openLoginForm();
        }

        private void pcReturn_Click(object sender, EventArgs e)
        {
            openReturnForm();
        }

        private void lbReturn_Click(object sender, EventArgs e)
        {
            openReturnForm();
        }


        private void pnBorrow_MouseClick(object sender, MouseEventArgs e)
        {
            openLoginForm();
        }

        private void pnReturn_MouseClick(object sender, MouseEventArgs e)
        {
            openReturnForm();
        }


        private void openLoginForm()
        {
            LoginForm loginForm = new LoginForm();
            loginForm.ShowDialog();
        }


        private void openReturnForm()
        {
            ReturnForm returnForm = new ReturnForm();
            returnForm.ShowDialog();
        }
    }
}
