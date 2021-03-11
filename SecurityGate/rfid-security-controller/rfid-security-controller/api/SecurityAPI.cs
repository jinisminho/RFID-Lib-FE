using rfid_security_controller.models;
using rfid_security_controller.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace rfid_security_controller.api
{
    public class SecurityAPI
    {
        public static async Task<BookListResponse> getDeactivatedBooks ()
        {

            string url = $"/Security/getAllDeactivatedBooks";
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {

                        DeactivatedBooks rs = await response.Content.ReadAsAsync<DeactivatedBooks>();

                        return new BookListResponse(true, "", rs.rfids);
                    }
                    else
                    {
                        ErrorDto error = await response.Content.ReadAsAsync<ErrorDto>();

                        return new BookListResponse(false, error.message, null);
                    }
                }
            }
            catch (Exception e)
            {
                return new BookListResponse(false, e.Message, null);
            }

        }

        public static async Task logSecurity(String rfid)
        {
            string url = $"/Security/log/" + rfid;
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }


    }
}
