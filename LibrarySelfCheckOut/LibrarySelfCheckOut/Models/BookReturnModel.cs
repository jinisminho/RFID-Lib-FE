using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookReturnModel
    {
        public BookReturnModel(long code, long id, string title, string username)
        {
            this.code = code;
            this.id = id;
            this.title = title;
            this.username = username;
        }

        public long code { get; set; }
        public long id { get; set; }
        public string title { get; set; }
        public string username { get; set; }
    }
}
