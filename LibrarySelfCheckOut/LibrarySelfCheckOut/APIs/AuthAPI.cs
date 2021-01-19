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
    public class AuthAPI
    {
        public static async Task<AuthResponse> findStudentByRFID(String rfid)
        {
            string url = $"/Account/login/" + rfid;
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
            {
                if (response.IsSuccessStatusCode)
                {

                    AuthStudentModel student = await response.Content.ReadAsAsync<AuthStudentModel>();
                   
                    return new AuthResponse(true, "", student);
                }
                else
                {
                    ErrorDto error = await response.Content.ReadAsAsync<ErrorDto>();

                    return new AuthResponse(false, error.message, null);
                }
            }
        }
    }
}
