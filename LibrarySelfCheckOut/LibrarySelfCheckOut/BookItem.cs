using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut
{
    public partial class BookItem : UserControl
    {


        public BookItem(int index, BookModel book)
        {
            InitializeComponent();
            this.lbIndex.Text = index + ".";
            this.lbTitle.Text = book.title;
            this.lbBookDescription.Text = book.authors + " - " + book.edition + " edt";
        }

        private void BookItem_Load(object sender, EventArgs e)
        {

        }
    }
}
