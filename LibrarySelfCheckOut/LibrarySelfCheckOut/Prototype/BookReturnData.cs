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
            BookReturnModel b1 = new BookReturnModel(1, 1, "The Hobbit", "se130038");
            BookReturnModel b2 = new BookReturnModel(2, 1, "Belonging", "se130038");
            BookReturnModel b3 = new BookReturnModel(3, 1, "SUQAR", "se130038");
            BookReturnModel b4 = new BookReturnModel(4, 1, "Hamilton", "se130038");
            BookReturnModel b5 = new BookReturnModel(5, 1, "The Outsider", "se130056");
            BookReturnModel b6 = new BookReturnModel(6, 1, "Candy Is Magic", "se130054");

            books.Add(b1);
            books.Add(b2);
            books.Add(b3);
            books.Add(b4);
            books.Add(b5);
            books.Add(b6);
        }


        public ReturnResponseModel returnBook(List<long> bookCodeList)
        {
            List<BookReturnModel> rs = new List<BookReturnModel>();
            foreach (long code in bookCodeList)
            {
                BookReturnModel tmp = books.Where(b => b.code == code).Select(b => b).FirstOrDefault();
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
