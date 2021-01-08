
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.APIs;
using LibrarySelfCheckOut.Models;
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut.Processors
{
    public class AuthProcessor
    {

        //tam thoi
        public static string checkLogin(long studentRFID)
        {
            //call api 
            if (studentRFID == 001730002)
            {
                return "valid";
            }
            return "invalid";
        }


        public static async Task<AuthStudentModel> checkLoginAPI(long studentRFID)
        {
            AuthStudentModel student = await AuthAPI.findStudentByRFID(studentRFID);
            return student;
        }

    }
}
