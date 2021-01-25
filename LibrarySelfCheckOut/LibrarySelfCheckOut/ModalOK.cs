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
    public partial class ModalOK : Form
    {
        public ModalOK(String msg)
        {
            InitializeComponent();
            this.lbMsg.Text = msg;
            this.TopMost = true;

        }

        private void BtOK_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
