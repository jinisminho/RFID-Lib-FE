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
            this.lbBook.Text = book.title;
            if (book.isBorrowed)
            {
                this.lbStatus.ForeColor = Color.Green;
                this.lbStatus.Text = "Status: CHECKED OUT";
                this.lbDueDate.Text = "Due date: " + book.dueDate;
            }
            else
            {
                this.lbStatus.ForeColor = Color.Red;
                this.lbStatus.Text = "Status: NOT ALLOWED TO CHECK OUT";
                this.lbDueDate.Text = "";
            }
        }

        private void BookItem_Load(object sender, EventArgs e)
        {

        }
    }
}
