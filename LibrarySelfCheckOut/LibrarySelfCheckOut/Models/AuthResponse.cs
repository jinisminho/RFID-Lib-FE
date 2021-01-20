using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class AuthResponse
    {
        public bool isSuccess { get; set; }

        public String msg { get; set; }

        public AuthStudentModel student { get; set; }

        public AuthResponse(bool isSuccess, string msg, AuthStudentModel student)
        {
            this.isSuccess = isSuccess;
            this.msg = msg;
            this.student = student;
        }
    }
}
