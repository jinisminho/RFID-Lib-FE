using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Utils
{
    public class APIHelpers
    {

        private static readonly string BASE_URL = "http://localhost:8099";
        public static HttpClient ApiClient { get; set; }

        public static void initializeClient()
        {
            ApiClient = new HttpClient();
            ApiClient.BaseAddress = new Uri(BASE_URL);
            ApiClient.DefaultRequestHeaders.Accept.Clear();
            ApiClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
    }
}
