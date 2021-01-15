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
        public static async Task<BookCheckOutModel> findBookByBookRFID(long bookRFID)
        {
            string url = $"win/book?bookRFID=" + bookRFID;
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {

                    BookCheckOutModel book = await response.Content.ReadAsAsync<BookCheckOutModel>();
                   
                    return book;
                }
                else
                {
                    throw null;
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
                    return "failed";
                }
            }
        }
    }
}
