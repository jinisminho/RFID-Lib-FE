using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Prototype
{
    public class AuthData
    {
        List<AuthStudentModel> students = new List<AuthStudentModel>();

        public AuthData()
        {
            AuthStudentModel auth1 = new AuthStudentModel(001730002,2222,"se130038","Phan Hoang Tram","ROLE_STUDENT",4,"ACTIVE");
            AuthStudentModel auth2 = new AuthStudentModel(001730003, 2222, "se130038", "Phan Hoang Tram", "ROLE_STUDENT", 4, "NOT_RETURN");
            AuthStudentModel auth3 = new AuthStudentModel(001730001, 2222, "se130038", "Phan Hoang Tram", "ROLE_STUDENT", 4, "DEACTIVE");
            students.Add(auth1);
            students.Add(auth2);
            students.Add(auth3);
        }

        public AuthStudentModel findStudentByIdAndPin(long id, long pin)
        {
            AuthStudentModel rs = null;
            rs = students.Where(s => s.id == id && s.pin == pin).Select(s => s).FirstOrDefault();
            return rs;
        }

        public AuthStudentModel findStudentById(long id)
        {
            AuthStudentModel rs = null;
            rs = students.Where(s => s.id == id).Select(s => s).FirstOrDefault();
            return rs;
        }

    }
}
