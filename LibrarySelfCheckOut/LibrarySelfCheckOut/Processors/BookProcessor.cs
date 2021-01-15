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
        public static CheckOutResponseModel checkout(List<String> bookCodeList, long studentID)
        {
            BookCheckOutData data = new BookCheckOutData();
            return data.checkout(bookCodeList);
        }


        public static ReturnResponseModel returnBooks(List<String> bookCodeList)
        {

            BookReturnData data = new BookReturnData();
            return data.returnBook(bookCodeList);
        }

        public static BookScannedResponseModel getBookByRfid (String rfid)
        {
            BookScannedData data = new BookScannedData();
            return data.getBookByRfid(rfid);
        }
    }
}
