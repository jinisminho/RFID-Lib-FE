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
            //BookReturnModel b1 = new BookReturnModel("E28068940000500BB95750AE", 1, "The Hobbit","RETURNED");
            //BookReturnModel b2 = new BookReturnModel("E28068940000400BB9574CAE", 2, "Belonging", "RETURNED");
            //BookReturnModel b3 = new BookReturnModel("E28068940000400BB95754AE", 3, "SUQAR","RETURNED");
            //BookReturnModel b4 = new BookReturnModel("E28068940000500BB95748AE", 4, "Hamilton","CANNOT RETURN");
            //BookReturnModel b5 = new BookReturnModel("E28068940000400BB95758AE", 5, "The Outsider","CANNOT RETURN");


        }


        public ReturnResponseModel returnBook(List<String> bookCodeList)
        {
            List<BookReturnModel> rs = new List<BookReturnModel>();
            foreach (String code in bookCodeList)
            {
                BookReturnModel tmp = books.Where(b => b.rfid == code).Select(b => b).FirstOrDefault();
                if(tmp == null)
                {
                    return new ReturnResponseModel(false, "Wrong Book Code. Please contact Librarian.", null);
                }
                rs.Add(tmp);
            }
            return new ReturnResponseModel(true, "", rs);
            
        }
    }
}
