using System;

namespace LibrarySelfCheckOut.Models
{
    public class BookCheckOutModel
    {

        public String rfid { get; set; }
        public string title { get; set; }
        public bool ableToBorrow { get; set; }
        public String dueDate { get; set; }
        public int edition { get; set; }
        public String authors { get; set; }
        public String img { get; set; }
        public String subtitle { get; set; }
        public String group { get; set; }
        public String borrowedAt { get; set; }
    }
}
