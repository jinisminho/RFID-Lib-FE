
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.APIs;
using LibrarySelfCheckOut.Models;
using LibrarySelfCheckOut.Prototype;
using LibrarySelfCheckOut.Utils;

namespace LibrarySelfCheckOut.Processors
{
    public class AuthProcessor
    {

        //tam thoi
        public static AuthStudentModel checkLogin(String rfid, long pin)
        {
            AuthData data = new AuthData();
            AuthStudentModel student = data.findStudentByIdAndPin(rfid, pin);
            return student;
        }

        public static AuthStudentModel checkLogin(String rfid)
        {
            AuthData data = new AuthData();
            AuthStudentModel student = data.findStudentById(rfid);
            return student;
        }




    }
}
