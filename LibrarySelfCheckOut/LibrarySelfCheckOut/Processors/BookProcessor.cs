using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.APIs;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Processors
{
    public class BookProcessor
    {
        public static async Task<BookModel> findBookByRFID (long bookRFID)
        {
            //BookModel book = await BookAPI.findBookByBookRFID(bookRFID);
            //test
            BookModel tmp = new BookModel { id = 1, title = "The Seven Habits of Highly Effective People", author = "Stephen R. Covey", edition = 1, publishedYear = 1992, dueDate = "12/12/2020" };

            return tmp;
        }

        public static async Task<String> addBookBorrow (long studentId, List<long> bookIdList)
        {
            //string msg = await BookAPI.addBookBorrow(studentId, bookIdList);

            return "OK";
        }



    }
}
