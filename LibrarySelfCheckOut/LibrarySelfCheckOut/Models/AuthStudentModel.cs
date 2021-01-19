using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class AuthStudentModel
    {
  
        public int id { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public int maxNumberBorrowAllowed { get; set; }
        public bool overDue { get; set; }

    }
}
