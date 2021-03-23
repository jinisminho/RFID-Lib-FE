using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DropBoxUI.Models;

namespace DropBoxUI
{
    public partial class BookScannedItem : UserControl
    {
        public BookScannedItem(BookScannedModel book)
        {
            InitializeComponent();
            String fullTitle = book.subtitle == "" ? book.title : book.title + ": " + book.subtitle;
            lbTitle.Text = fullTitle.Length <= 50 ? fullTitle : fullTitle.Substring(0, 47) + "...";
            lbEdition.Text = "Edition: " + book.edition;
            lbAuthors.Text = "Author(s): " + (book.authors.Length <= 50 ? book.authors : book.authors.Substring(0, 47) + "...");
            picBook.Load(book.img);
            lbGroup.Text = "Group: " + book.group;
        }
    }
}
