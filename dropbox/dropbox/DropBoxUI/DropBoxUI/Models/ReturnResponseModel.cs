using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Models
{
    public class ReturnResponseModel
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public BookReturnModel book { get; set; }

        public ReturnResponseModel(bool isSuccess, string errorMessage, BookReturnModel book)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.book = book;
        }
    }
}
