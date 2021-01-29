﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Utils
{
    public class Constant
    {
        public static readonly string PATRON_CARD_PREFIX = "PAT#";

        public static readonly int TID_LENGTH = 24;

        public static readonly int LOGIN_SESSION_TIME_OUT = 90;

        public static readonly int PROCESS_SESSION_TIME_OUT = 120;

        public static readonly string CURRENCY = "VND";
    }
}
