using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class CheckOutResponseModel
    {
        public CheckOutResponseModel(bool isSuccess, bool canBorrowAll, string errorMessage, List<BookModel> books, string dueDate)
        {
            this.isSuccess = isSuccess;
            this.canBorrowAll = canBorrowAll;
            this.errorMessage = errorMessage;
            this.books = books;
            this.dueDate = dueDate;
        }

        public bool isSuccess { get; set; }
        
        public bool canBorrowAll { get; set; }
        public string errorMessage { get; set; }
        public List<BookModel> books { get; set; }
        public string dueDate { get; set; }

    }
}
