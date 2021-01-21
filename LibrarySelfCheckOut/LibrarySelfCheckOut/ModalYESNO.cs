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
    public partial class ModalYESNO : Form
    {

        public DialogResult result { get; set; }
        public ModalYESNO(String msg)
        {
            InitializeComponent();
            this.lbMsg.Text = msg;
            this.TopMost = true;

        }

        private void ntYes_Click(object sender, EventArgs e)
        {
            this.result = DialogResult.Yes;
            this.Close();
        }

        private void btNO_Click(object sender, EventArgs e)
        {
            this.result = DialogResult.No;
            this.Close();
        }
    }
}
