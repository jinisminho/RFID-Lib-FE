using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookScanReturnResponse
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public BookScannedReturn book { get; set; }

        public BookScanReturnResponse(bool isSuccess, string errorMessage, BookScannedReturn book)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.book = book;
        }
    }
}
