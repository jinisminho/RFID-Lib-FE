using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.APIs;
using LibrarySelfCheckOut.Models;
using LibrarySelfCheckOut.Prototype;

namespace LibrarySelfCheckOut.Processors
{
    public class BookProcessor
    {
       public static CheckOutResponseModel checkout(List<long> bookCodeList)
        {
            BookData data = new BookData();
            return data.checkout(bookCodeList);
        }



    }
}
