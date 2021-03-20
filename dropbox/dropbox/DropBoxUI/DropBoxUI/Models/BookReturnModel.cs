using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Models
{
    public class BookReturnModel
    {
        public String status { get; set; }
        public String rfid { get; set; }
        public String title { get; set; }
        public int edition { get; set; }
        public String authors { get; set; }
        public String img { get; set; }
        public String subtitle { get; set; }
        public String group { get; set; }
        public int overdueDay { get; set; }
        public double fine { get; set; }
        public String returnedAt { get; set; }
        public String genres { get; set; }
        public String patron { get; set; }
    }
}
