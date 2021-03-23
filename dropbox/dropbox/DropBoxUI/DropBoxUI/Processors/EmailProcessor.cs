using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DropBoxUI.APIs;
using DropBoxUI.Models;

namespace DropBoxUI.Processors
{
    public class EmailProcessor
    {
        public async static Task emailReturn( BookReturnModel book)
        {
            List<BookReturnModel> books = new List<BookReturnModel>();
            books.Add(book);
            await EmailAPI.emailReturn(books);
        }
    }
}
