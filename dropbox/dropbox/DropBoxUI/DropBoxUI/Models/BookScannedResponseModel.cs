using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Models
{
    public class BookScannedResponseModel
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public BookScannedModel book { get; set; }

        public BookScannedResponseModel(bool isSuccess, string errorMessage, BookScannedModel book)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.book = book;
        }
    }
}
