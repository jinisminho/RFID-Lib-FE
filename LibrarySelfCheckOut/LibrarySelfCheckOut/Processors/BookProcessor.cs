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
        public async static Task<CheckOutResponseModel> checkout(List<String> bookCodeList, int patronId)
        {
            CheckOutRequestModel requestBody = new CheckOutRequestModel();
            requestBody.patronId = patronId;
            requestBody.bookCodeList = bookCodeList;
            return await BookAPI.addBookBorrow(requestBody);
        }


        public async static Task<ReturnResponseModel> returnBooks(List<String> bookCodeList)
        {
            return  await BookAPI.returnBook(bookCodeList);
           
        }

        public async static Task<BookScannedResponseModel> getBookByRfid (String rfid)
        {
            return await BookAPI.findBookByBookRFID(rfid);
        }
    }
}
