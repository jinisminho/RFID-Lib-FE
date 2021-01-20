using System;

namespace LibrarySelfCheckOut.Models
{
    public class BookCheckOutModel
    {


        public String rfid { get; set; }
        public string title { get; set; }
        public bool ableToBorrow { get; set; }
        public String dueDate { get; set; }
    }
}
