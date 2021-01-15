using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Prototype
{
    public class BookScannedData
    {
        List<BookScannedModel> books = new List<BookScannedModel>();

        public BookScannedData()
        {
            BookScannedModel b1 = new BookScannedModel("1", "The Hobbit");
            BookScannedModel b2 = new BookScannedModel("2", "Belonging");
            BookScannedModel b3 = new BookScannedModel("3", "SUQAR");
            BookScannedModel b4 = new BookScannedModel("4", "Hamilton");
            BookScannedModel b5 = new BookScannedModel("5", "The Outsider");
            BookScannedModel b6 = new BookScannedModel("6", "Candy Is Magic");

            books.Add(b1);
            books.Add(b2);
            books.Add(b3);
            books.Add(b4);
            books.Add(b5);
            books.Add(b6);
        }


        public BookScannedResponseModel getBookByRfid (String rfid)
        {
            BookScannedModel tmp = books.Where(b => b.rfid == rfid).Select(b => b).FirstOrDefault();
            if(tmp == null)
            {
                return new BookScannedResponseModel(false, "book with code:" + rfid + "Not Found. Please contact the libararian! We will reset your return", null);
            }
            return new BookScannedResponseModel(true, "", tmp);
        }
    }
}
