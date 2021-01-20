using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookScannedModel
    {
        public String rfid { get; set; }
        public String title { get; set; }

        public BookScannedModel(string rfid, string title)
        {
            this.rfid = rfid;
            this.title = title;
        }
    }
}
