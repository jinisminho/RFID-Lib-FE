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


        public BookItem(BookCheckOutModel book)
        {
            InitializeComponent();
            String fullTitle = book.subtitle == "" ? book.title : book.title + ": " + book.subtitle;
            lbTitle.Text = fullTitle.Length <= 50 ? fullTitle : fullTitle.Substring(0, 47) + "...";
            lbEdition.Text = "Edition: " + book.edition;
            lbAuthors.Text = "Author(s): " + (book.authors.Length <= 50 ? book.authors : book.authors.Substring(0, 47) + "...");
            picBook.Load(book.img);
            lbGroup.Text = "Group: " + book.group;
            if (book.ableToBorrow)
            {
                this.lbMessage.Text = "Borrowed at: " + book.borrowedAt;
                this.lbDueDate.Text = "Due date: " + book.dueDate;
            }
            else
            {
                this.lbMessage.ForeColor = Color.Red;
                this.lbMessage.Text = "Message: NOT ALLOWED TO BORROW";
                this.lbDueDate.Text = "";
            }
        }

        private void BookItem_Load(object sender, EventArgs e)
        {

        }
    }
}
