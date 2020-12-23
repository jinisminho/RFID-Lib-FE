using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfReturn.APIs;
using LibrarySelfReturn.Models;

namespace LibrarySelfReturn.Processors
{
    public class AuthProcessor
    {

        //tam thoi
        public static string checkLogin(long studentRFID)
        {
            //call api 
            if (studentRFID == 123)
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
