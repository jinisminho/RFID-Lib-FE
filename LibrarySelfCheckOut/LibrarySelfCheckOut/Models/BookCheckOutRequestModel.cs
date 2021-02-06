using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookCheckOutRequestModel
    {
        public String rfid { get; set; }
        public String group { get; set; }

        public int groupId { get; set; }

        public int bookId { get; set; }

        public String title { get; set; }

        public BookCheckOutRequestModel(string rfid, string group, int groupId, int bookId, string title)
        {
            this.rfid = rfid;
            this.group = group;
            this.groupId = groupId;
            this.bookId = bookId;
            this.title = title;
        }
    }
}
