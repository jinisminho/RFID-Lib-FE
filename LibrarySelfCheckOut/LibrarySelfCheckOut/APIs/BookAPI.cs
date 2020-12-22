using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut.APIs
{
    public class BookAPI
    {
        public static async Task<BookModel> findBookByBookRFID(long bookRFID)
        {
            string url = $"win/book?bookRFID=" + bookRFID;
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {

                    BookModel book = await response.Content.ReadAsAsync<BookModel>();
                   
                    return book;
                }
                else if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    return null;
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
            }
        }

        public static async Task<String> addBookBorrow(long studentId, List<long> bookIdList)
        {
            string url = $"win/bookBorrow?studentId=" + studentId;
            using (HttpResponseMessage response = await APIHelper.ApiClient.PostAsJsonAsync(url, bookIdList))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {

                    string message = await response.Content.ReadAsStringAsync();
                    return message;
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
            }
        }
    }
}
