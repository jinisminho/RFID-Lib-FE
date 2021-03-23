using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DropBoxUI
{
    public partial class ModalYESNO : Form
    {

        public DialogResult result { get; set; }

        public ModalYESNO(String msg, String header)
        {
            InitializeComponent();
            this.lbHeader.Text = header;
            this.lbMsg.Text = msg;
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
