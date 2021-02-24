using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut
{
    public partial class ModalOK : Form
    {
        public ModalOK(String title,String msg)
        {
            InitializeComponent();
            if (title.Contains(Constant.RESET_TITLE))
            {
                this.lbMsg.Text = msg + "\nThe system will reset scaning for violate policy/error";

            }
            else
            {
                this.lbMsg.Text = msg;

            }
            this.TopMost = true;

        }

        private void BtOK_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
