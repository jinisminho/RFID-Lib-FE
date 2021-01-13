using System;

namespace LibrarySelfCheckOut.Models
{
    public class BookModel
    {
        public BookModel(String rfid, long id, string title, string authors, int edition, bool ableToBorrow)
        {
            this.rfid = rfid;
            this.id = id;
            this.title = title;
            this.authors = authors;
            this.edition = edition;
            this.ableToBorrow = ableToBorrow;
        }

        public String rfid { get; set; }
        public long id { get; set; }
        public string title { get; set; }
        public string authors { get; set; }
        public int edition { get; set; }
        public bool ableToBorrow { get; set; }
    }
}
