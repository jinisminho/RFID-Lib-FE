namespace LibrarySelfCheckOut.Models
{
    public class BookModel
    {
        public BookModel(long code, long id, string title, string authors, int edition, bool ableToBorrow)
        {
            this.code = code;
            this.id = id;
            this.title = title;
            this.authors = authors;
            this.edition = edition;
            this.ableToBorrow = ableToBorrow;
        }

        public long code { get; set; }
        public long id { get; set; }
        public string title { get; set; }
        public string authors { get; set; }
        public int edition { get; set; }
        public bool ableToBorrow { get; set; }
    }
}
