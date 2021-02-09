using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class EmailCheckOutRequest
    {
        public int patronId { get; set; }
        public List<BookCheckOutModel> books { get; set; }

        public EmailCheckOutRequest(int patronId, List<BookCheckOutModel> books)
        {
            this.patronId = patronId;
            this.books = books;
        }
    }
}
