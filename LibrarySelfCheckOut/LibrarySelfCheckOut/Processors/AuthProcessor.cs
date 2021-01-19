
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


        public static async Task<AuthResponse> checkLogin(String rfid)
        {
            return await AuthAPI.findStudentByRFID(rfid);
        }

      




    }
}
