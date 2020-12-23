using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfReturn.Models;
using LibrarySelfReturn.Utils;

namespace LibrarySelfReturn.APIs
{
    public class BookAPI
    {

        public static async Task<BookReturnModel> returnABookByRFID (long bookRFID, long studentId, string transactionId)
        {
            string url = $"win/book/return?bookRFID=" + bookRFID + "&studentId=" + studentId + "transactionId=" + transactionId;
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {

                    BookReturnModel book = await response.Content.ReadAsAsync<BookReturnModel>();

                    return book;
                }
                else
                {
                    return null;
                }
            }
        }

        public static async Task<String> sendEmailForReturnTransaction (string transactionId)
        {
            string url = $"win/bookBorrow?transactionId=" + transactionId;
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
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
