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
    public class BookAPI
    {

        public static async Task<BookScannedResponseModel> findBookByBookRFID(String rfid)
        {
            string url = $"/BookCopy/" + rfid;
            try
            {
                using (HttpResponseMessage response = await APIHelpers.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {

                        BookScannedModel book = await response.Content.ReadAsAsync<BookScannedModel>();

                        return new BookScannedResponseModel(true, "", book);
                    }
                    else
                    {
                        ErrorModel error = await response.Content.ReadAsAsync<ErrorModel>();

                        return new BookScannedResponseModel(false, error.message, null);
                    }
                }
            }
            catch (Exception e)
            {
                return new BookScannedResponseModel(false, e.Message, null);
            }

        }


        public static async Task<ReturnResponseModel> returnBook(ReturnRequestModel requestBody)
        {
            string url = $"/BookBorrowing/returnOne";
            try
            {
                using (HttpResponseMessage response = await APIHelpers.ApiClient.PostAsJsonAsync(url, requestBody))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        BookReturnModel book = await response.Content.ReadAsAsync<BookReturnModel>();

                        return new ReturnResponseModel(true, "", book);
                    }
                    else
                    {
                        ErrorModel error = await response.Content.ReadAsAsync<ErrorModel>();
                        return new ReturnResponseModel(false, error.message, null);
                    }
                }
            }
            catch (Exception e)
            {
                return new ReturnResponseModel(false, e.Message, null);

            }

        }

    }
}
