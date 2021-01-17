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
            AuthStudentModel auth1 = new AuthStudentModel("00AD0002",1,2222,"se130038","Phan Hoang Tram", "ROLE_PATRON", 4,"ACTIVE");
            AuthStudentModel auth2 = new AuthStudentModel("00AD0003",2, 2222, "se130038", "Phan Hoang Tram", "ROLE_PATRON", 4, "NOT_RETURN");
            AuthStudentModel auth3 = new AuthStudentModel("00AD0001",3, 2222, "se130038", "Phan Hoang Tram", "ROLE_PATRON", 4, "DEACTIVE");
            
            students.Add(auth1);
            students.Add(auth2);
            students.Add(auth3);
        }

        public AuthStudentModel findStudentByIdAndPin(String rfid, long pin)
        {
            AuthStudentModel rs = null;
            rs = students.Where(s => s.rfid == rfid && s.pin == pin).Select(s => s).FirstOrDefault();
            return rs;
        }

        public AuthStudentModel findStudentById(String rfid)
        {
            AuthStudentModel rs = null;
            rs = students.Where(s => s.rfid == rfid).Select(s => s).FirstOrDefault();
            return rs;
        }

    }
}
