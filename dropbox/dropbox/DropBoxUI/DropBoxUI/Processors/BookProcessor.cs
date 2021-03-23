using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DropBoxUI.APIs;
using DropBoxUI.Models;

namespace DropBoxUI.Processors
{
    public class BookProcessor
    {
        public async static Task<ReturnResponseModel> returnBook(String bookRfid)
        {
            return await BookAPI.returnBook(new ReturnRequestModel(bookRfid));

        }
    }
}
