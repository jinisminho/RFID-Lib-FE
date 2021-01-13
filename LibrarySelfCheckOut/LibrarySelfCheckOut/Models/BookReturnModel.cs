using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookReturnModel
    {
        public BookReturnModel(string code, long id, string title, string username, string status)
        {
            this.rfid = code;
            this.id = id;
            this.title = title;
            this.username = username;
            this.status = status;
        }

        public String rfid { get; set; }
        public long id { get; set; }
        public string title { get; set; }
        public string username { get; set; }
        public string status { get; set; }
    }
}
