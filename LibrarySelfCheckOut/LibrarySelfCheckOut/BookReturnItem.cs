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
    public partial class BookReturnItem : UserControl
    {

        public BookReturnItem(int index, string username, string bookTitle)
        {
            InitializeComponent();
            this.lbUser.Text = username;
            this.lbBook.Text = bookTitle;
            this.lbIndex.Text = index + ".";
        }
    }
}
