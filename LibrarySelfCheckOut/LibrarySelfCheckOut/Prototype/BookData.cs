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
            BookModel book1 = new BookModel(1,1, "The Hobbit", "J.R.R Tolken", 12, true);
            BookModel book2 = new BookModel(2,2, "Belonging", "Nora Krug", 3, true);
            BookModel book3 = new BookModel(3,3, "SUQAR", "Greg Malouf, Lucy Malouf, Alan Benson ", 9, true);
            BookModel book4 = new BookModel(4,4, "Hamilton", "Lin - Manuel Miranda, Jeremy McCarter ", 9, true);
            BookModel book5 = new BookModel(5,5, "The Outsider", "Stephen King ", 9, false);
            BookModel book6 = new BookModel(6,6, "Candy Is Magic", "", 6, false);

            books.Add(book1);
            books.Add(book2);
            books.Add(book3);
            books.Add(book4);
            books.Add(book5);
            books.Add(book6);
        }

        public CheckOutResponseModel checkout (List<long> bookCodeList)
        {
            List<BookModel> checkedBook = new List<BookModel>();
            List<BookModel> bookCannotBorrow = new List<BookModel>();
            foreach(long code in bookCodeList)
            {
                BookModel tmp = books.Where(b => b.code == code).Select(b => b).FirstOrDefault();
                if (tmp.ableToBorrow)
                {
                    checkedBook.Add(tmp);
                }
                else
                {
                    bookCannotBorrow.Add(tmp);
                }
            }
            if(bookCannotBorrow.Count > 0)
            {
                return new CheckOutResponseModel(true, false, "", bookCannotBorrow, "");
            }
            else
            {
                return new CheckOutResponseModel(true, true, "", checkedBook, "2021/12/12");
            }
        }


    }
}
