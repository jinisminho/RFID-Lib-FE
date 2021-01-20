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
            //BookCheckOutModel book1 = new BookCheckOutModel("E28068940000500BB95750AE", 1, "The Hobbit", true, "01/14/2021");
            //BookCheckOutModel book2 = new BookCheckOutModel("E28068940000400BB9574CAE", 2, "Belonging", true, "01/14/2021");
            //BookCheckOutModel book3 = new BookCheckOutModel("E28068940000400BB95754AE", 3, "SUQAR", true, "01/14/2021");
            //BookCheckOutModel book4 = new BookCheckOutModel("E28068940000500BB95748AE", 4, "Hamilton",true, "01/14/2021");
            //BookCheckOutModel book5 = new BookCheckOutModel("E28068940000400BB95758AE", 5, "The Outsider",false, "01/14/2021");


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
