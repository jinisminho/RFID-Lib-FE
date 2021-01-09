using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class AuthStudentModel
    {
        public AuthStudentModel(long id, long pin, string username, string name, string role, int maxNumberBorrowAllowed, string status)
        {
            this.id = id;
            this.pin = pin;
            this.username = username;
            this.name = name;
            this.role = role;
            this.maxNumberBorrowAllowed = maxNumberBorrowAllowed;
            this.status = status;
        }

        public long id { get; set; }
        public long pin { get; set; }
        public string username { get; set; }
        public string name { get; set; }
        public string role { get; set; }
        public int maxNumberBorrowAllowed { get; set; }

        public string status { get; set; }



    }
}
