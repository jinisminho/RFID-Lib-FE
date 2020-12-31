using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookModel
    {
        public long id { get; set; }
        public string title { get; set; }
        public int publishedYear { get; set; }
        public string author { get; set; }
        public int edition { get; set; }
        public string dueDate { get; set;}

    }
}
