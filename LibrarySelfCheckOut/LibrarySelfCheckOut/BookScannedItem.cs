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
    public partial class BookScannedItem : UserControl
    {
        private const int drop_shadow = 0x00020000;
        protected override CreateParams CreateParams
        {
            get
            {
                CreateParams cp = base.CreateParams;
                cp.ClassStyle |= drop_shadow;
                return cp;
            }
        }
        public BookScannedItem(BookScannedModel book)
        {
            InitializeComponent();
            lbTitle.Text = book.subtitle == "" ? book.title : book.title + ": " + book.subtitle;
            lbEdition.Text = "Edition: " + book.edition;
            lbAuthors.Text = "Author(s): " + book.authors;
            picBook.Load(book.img);
            lbGroup.Text = "Group: " + book.group;
        }
    }
}
