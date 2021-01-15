using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LibrarySelfCheckOut
{
    public partial class BookScannedItem : UserControl
    {
        public BookScannedItem(int index, String title)
        {
            InitializeComponent();
            this.lbIndex.Text = index.ToString();
            this.lbTitle.Text = "Book: " + title;
        }
    }
}
