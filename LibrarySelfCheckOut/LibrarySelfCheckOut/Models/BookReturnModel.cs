﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class BookReturnModel
    {
        public String rfid { get; set; }
        public string title { get; set; }
        public string status { get; set; }
    }
}
