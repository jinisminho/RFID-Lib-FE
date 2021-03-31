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
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut
{
    public partial class ScanReturnItem : UserControl
    {
        public ScanReturnItem(BookScannedReturn book)
        {
            InitializeComponent();
            String fullTitle = book.subtitle == null ? book.title : book.title + ": " + book.subtitle;
            lbTitle.Text = fullTitle.Length <= UIMessage.MAX_STRING_LENGTH ?
                fullTitle : fullTitle.Substring(0, UIMessage.MAX_STRING_LENGTH - 3) + "...";
            lbEdition.Text = "Edition: " + book.edition;
            lbAuthors.Text = "Author(s): " +
                (book.authors.Length <= UIMessage.MAX_STRING_LENGTH ? book.authors : book.authors.Substring(0, UIMessage.MAX_STRING_LENGTH - 3) + "...");

            try
            {
                picBook.Load(book.img);
            }
            catch (Exception)
            {
                picBook.Image = Properties.Resources._130304;
            }
            lbGroup.Text = "Group: " + book.group;
            txtBorrower.Text = "Borrower: " + book.borrower;
        }
    }
}
