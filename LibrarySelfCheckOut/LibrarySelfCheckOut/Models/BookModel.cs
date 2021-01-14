using System;

namespace LibrarySelfCheckOut.Models
{
    public class BookModel
    {
        public BookModel(string rfid, long id, string title, bool ableToBorrow, string dueDate)
        {
            this.rfid = rfid;
            this.id = id;
            this.title = title;
            this.isBorrowed = ableToBorrow;
            this.dueDate = dueDate;
        }

        public String rfid { get; set; }
        public long id { get; set; }
        public string title { get; set; }
        public bool isBorrowed { get; set; }
        public String dueDate { get; set; }
    }
}
