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

        public BookReturnItem(int index, string username, string bookTitle, string status)
        {
            InitializeComponent();
            this.lbUser.Text = "Patron: "  + username;
            this.lbBook.Text = "Book: " + bookTitle;
            this.lbIndex.Text = index + ".";
            if (status.Contains("CANNOT"))
            {
                this.lbStatus.Text = "Status: CANNOT RETURN - contact librarian for overdue return";
            }
            else
            {
                this.lbStatus.Text = "Status: RETURNED";
            }
        }
    }
}
