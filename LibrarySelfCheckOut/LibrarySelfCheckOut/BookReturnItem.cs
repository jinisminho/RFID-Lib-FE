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

        public BookReturnItem(int index, string bookTitle, string status)
        {
            InitializeComponent();
            this.lbBook.Text = "Book: " + bookTitle;
            this.lbIndex.Text = index + ".";
            if (status.Contains("OVERDUE"))
            {
                this.lbStatus.ForeColor = Color.Red;
                this.lbStatus.Text = "Status: CANNOT RETURN - contact librarian for overdue return";
            }
            else if (status.Contains("INVALID"))
            {
                this.lbStatus.ForeColor = Color.Red;
                this.lbStatus.Text = "Status: CANNOT RETURN - invalid book";
            }
            else
            {
                this.lbStatus.ForeColor = Color.Green;
                this.lbStatus.Text = "Status: RETURNED";
            }
        }
    }
}
