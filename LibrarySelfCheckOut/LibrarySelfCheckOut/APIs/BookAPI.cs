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
        public static async Task<BookScannedResponseModel> findBookByBookRFID(String rfid)
        {
            string url = $"/BookCopy/" + rfid;
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.GetAsync(url))
                {
                    if (response.IsSuccessStatusCode)
                    {

                        BookScannedModel book = await response.Content.ReadAsAsync<BookScannedModel>();

                        return new BookScannedResponseModel(true, "", book);
                    }
                    else
                    {
                        ErrorDto error = await response.Content.ReadAsAsync<ErrorDto>();

                        return new BookScannedResponseModel(false, error.message, null);
                    }
                }
            }
            catch(Exception e)
            {
                return new BookScannedResponseModel(false, e.Message, null);
            }
           
        }

        public static async Task<CheckOutResponseModel> addBookBorrow(CheckOutRequestModel requestBody)
        {
            string url = $"/BookBorrowing/checkout";
            try {
                using (HttpResponseMessage response = await APIHelper.ApiClient.PostAsJsonAsync(url, requestBody))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        List<BookCheckOutModel> books = await response.Content.ReadAsAsync<List<BookCheckOutModel>>();
                        return new CheckOutResponseModel(true, "", books);
                    }
                    else
                    {
                        ErrorDto error = await response.Content.ReadAsAsync<ErrorDto>();
                        return new CheckOutResponseModel(false, error.message, null);
                    }
                }
            }
            catch(Exception e)
            {
                return new CheckOutResponseModel(false, e.Message, null);

            }
            
        }

        public static async Task<ReturnResponseModel> returnBook(List<String> bookCodeList)
        {
            string url = $"/BookBorrowing/returnBatch";
            try
            {
                using (HttpResponseMessage response = await APIHelper.ApiClient.PostAsJsonAsync(url, bookCodeList))
                {
                    if (response.IsSuccessStatusCode)
                    {
                        List<BookReturnModel> books = await response.Content.ReadAsAsync<List<BookReturnModel>>();

                        return new ReturnResponseModel(true, "", books);
                    }
                    else
                    {
                        ErrorDto error = await response.Content.ReadAsAsync<ErrorDto>();
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
