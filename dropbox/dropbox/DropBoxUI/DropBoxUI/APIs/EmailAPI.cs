using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DropBoxUI.Models;
using DropBoxUI.Utils;

namespace DropBoxUI.APIs
{
    public class EmailAPI
    {
        public static object APIHelper { get; private set; }

        public static async Task emailReturn(List<BookReturnModel> request)
        {
            string url = $"/Email/return";
            try
            {
                using (HttpResponseMessage response = await APIHelpers.ApiClient.PostAsJsonAsync(url, request))
                {
                }
            }
            catch (Exception)
            {
            }

        }
    }
}
