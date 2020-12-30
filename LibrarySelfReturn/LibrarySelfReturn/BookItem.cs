using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using LibrarySelfReturn.Models;

namespace LibrarySelfReturn
{
    public partial class BookItem : UserControl
    {
        public BookItem(int index, BookReturnModel book)
        {
            InitializeComponent();
            this.lbIndex.Text = index + ".";
            this.lbTitle.Text = book.title;
            this.lbBookDescription.Text = book.author + " - " + book.edition + " edt - " + book.publishedYear;
            this.lbReturnAt.Text = book.returnAt;
        }
    }
}
