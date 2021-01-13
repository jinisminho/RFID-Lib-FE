using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Prototype
{
    public class BookReturnData
    {
        List<BookReturnModel> books = new List<BookReturnModel>();

        public BookReturnData()
        {
            //1st param is rfid
            BookReturnModel b1 = new BookReturnModel("1", 1, "The Hobbit", "se130038","RETURNED");
            BookReturnModel b2 = new BookReturnModel("2", 2, "Belonging", "se130038", "RETURNED");
            BookReturnModel b3 = new BookReturnModel("3", 3, "SUQAR", "se130038", "RETURNED");
            BookReturnModel b4 = new BookReturnModel("4", 4, "Hamilton", "se130038", "CANNOT RETURN");
            BookReturnModel b5 = new BookReturnModel("5", 5, "The Outsider", "se130056", "CANNOT RETURN");
            BookReturnModel b6 = new BookReturnModel("6", 6, "Candy Is Magic", "se130054", "CANNOT RETURN");

            books.Add(b1);
            books.Add(b2);
            books.Add(b3);
            books.Add(b4);
            books.Add(b5);
            books.Add(b6);
        }


        public ReturnResponseModel returnBook(List<String> bookCodeList)
        {
            List<BookReturnModel> rs = new List<BookReturnModel>();
            foreach (String code in bookCodeList)
            {
                BookReturnModel tmp = books.Where(b => b.rfid == code).Select(b => b).FirstOrDefault();
                if(tmp == null)
                {
                    return new ReturnResponseModel(false, "Wrong Book Code", null);
                }
                rs.Add(tmp);
            }
            return new ReturnResponseModel(true, "", rs);
            
        }
    }
}
