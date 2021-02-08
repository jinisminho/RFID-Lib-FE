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
    public class EmailAPI
    {
        public static async Task emailCheckOut(EmailCheckOutRequest request)
        {
            string url = $"/Email/checkout";
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.PostAsJsonAsync(url, request))
                {     
                }
            }
            catch (Exception)
            {
            }

        }

        public static async Task emailReturn(List<BookReturnModel> request)
        {
            string url = $"/Email/return";
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.PostAsJsonAsync(url, request))
                {
                }
            }
            catch (Exception)
            {
            }

        }

    }
}
