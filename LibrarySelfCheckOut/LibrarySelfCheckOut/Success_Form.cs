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
    public partial class Success_Form : Form
    {
        public Success_Form()
        {
            InitializeComponent();
            var t = new Timer();
            t.Interval = 2500;
            t.Tick += (s, d) =>
            {
                this.Close();
                t.Stop();
            };
            t.Start();
        }
    }
}
