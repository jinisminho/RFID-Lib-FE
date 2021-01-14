using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class CheckOutResponseModel
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public List<BookModel> books { get; set; }

        public CheckOutResponseModel(bool isSuccess, string errorMessage, List<BookModel> books)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.books = books;
        }

    }
}
