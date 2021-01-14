using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Prototype
{
    public class BookData
    {
        List<BookModel> books = new List<BookModel>();

        public BookData()
        {
            //1st param is rfid
            BookModel book1 = new BookModel("1",1, "The Hobbit", true, "01/14/2021");
            BookModel book2 = new BookModel("2",2, "Belonging", true, "01/14/2021");
            BookModel book3 = new BookModel("3",3, "SUQAR", true, "01/14/2021");
            BookModel book4 = new BookModel("4",4, "Hamilton",true, "01/14/2021");
            BookModel book5 = new BookModel("5",5, "The Outsider",false, "01/14/2021");
            BookModel book6 = new BookModel("6",6, "Candy Is Magic", false, "01/14/2021");

            books.Add(book1);
            books.Add(book2);
            books.Add(book3);
            books.Add(book4);
            books.Add(book5);
            books.Add(book6);
        }

        public CheckOutResponseModel checkout (List<String> bookCodeList)
        {
            List<BookModel> rs = new List<BookModel>();
            foreach(String code in bookCodeList)
            {
                BookModel tmp = books.Where(b => b.rfid == code).Select(b => b).FirstOrDefault();
                if(tmp == null)
                {
                    return new CheckOutResponseModel(false, "Wrong book Code", null);
                }
                rs.Add(tmp);
            }
            return new CheckOutResponseModel(true, "", rs);
        }


    }
}
