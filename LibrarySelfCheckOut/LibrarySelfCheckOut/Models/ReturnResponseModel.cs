using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class ReturnResponseModel
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public List<BookReturnModel> books { get; set; }

        public ReturnResponseModel(bool isSuccess, string errorMessage, List<BookReturnModel> books)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.books = books;
        }
    }
}
