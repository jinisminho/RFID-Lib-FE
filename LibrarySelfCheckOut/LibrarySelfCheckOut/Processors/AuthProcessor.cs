
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

        public static string checkLogin(string studentRFID)
        {
            //call api 
            Console.WriteLine(studentRFID);
            if (studentRFID.Equals(123))
            {
                return "valid";
            }
            return "invalid";
        }


        public static async Task<Student> checkLoginAPI(String studentRFID)
        {
            Student student = await AuthAPI.findStudentByRFID(studentRFID);
            return student;
        }

    }
}
