using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Prototype
{
    public class BookCheckOutData
    {
        List<BookCheckOutModel> books = new List<BookCheckOutModel>();

        public BookCheckOutData()
        {
            //1st param is rfid
            BookCheckOutModel book1 = new BookCheckOutModel("1",1, "The Hobbit", true, "01/14/2021");
            BookCheckOutModel book2 = new BookCheckOutModel("2",2, "Belonging", true, "01/14/2021");
            BookCheckOutModel book3 = new BookCheckOutModel("3",3, "SUQAR", true, "01/14/2021");
            BookCheckOutModel book4 = new BookCheckOutModel("4",4, "Hamilton",true, "01/14/2021");
            BookCheckOutModel book5 = new BookCheckOutModel("5",5, "The Outsider",false, "01/14/2021");
            BookCheckOutModel book6 = new BookCheckOutModel("6",6, "Candy Is Magic", false, "01/14/2021");

            books.Add(book1);
            books.Add(book2);
            books.Add(book3);
            books.Add(book4);
            books.Add(book5);
            books.Add(book6);
        }

        public CheckOutResponseModel checkout (List<String> bookCodeList)
        {
            List<BookCheckOutModel> rs = new List<BookCheckOutModel>();
            foreach(String code in bookCodeList)
            {
                BookCheckOutModel tmp = books.Where(b => b.rfid == code).Select(b => b).FirstOrDefault();
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
