using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfReturn.APIs;
using LibrarySelfReturn.Models;

namespace LibrarySelfReturn.Processors
{
    public class BookReturnProcessor
    {
        public static async Task<BookReturnModel> returnABook (long bookRFID, long studentId, string transactionId)
        {
            //BookReturnModel book = await BookAPI.returnABookByRFID(bookRFID, studentId, transactionId);
            //test
            BookReturnModel tmp = new BookReturnModel { id = 1, title = "The Seven Habits of Highly Effective People", author = "Stephen R. Covey", edition = 1, publishedYear = 1992, dueDate = "12/12/2020", returnAt = "12/11/2020 14:45:00" };

            return tmp;
        }

        public static async Task<String> sendEmailForReturnTransaction (string transactionId)
        {
            //string msg = await BookAPI.sendEmailForReturnTransaction(transactionId);

            return "OK";
        }

    }
}
