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
    public class AuthAPI
    {
        public static async Task<AuthStudentModel> findStudentByRFID(String studentRFID)
        {
            string url = "";
            using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {

                    AuthStudentModel student = await response.Content.ReadAsAsync<AuthStudentModel>();
                    return student;
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
    }
}
