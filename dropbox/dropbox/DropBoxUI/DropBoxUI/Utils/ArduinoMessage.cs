using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Utils
{
    public class ArduinoMessage
    {
        //request to front door
        public static readonly string RQ_FONT_OPEN = "#FDOP\n";
        public static readonly string RQ_FONT_CLOSE = "#FDCL\n";

        //reuqest to back door
        public static readonly string RQ_BACK_OPEN = "#BDOP\n";
        public static readonly string RQ_BACK_CLOSE = "#BDCL\n";

        //response from front door
        public static readonly string RP_FONT_OPENED = "OPENED";
        public static readonly string RP_FONT_CLOSED = "CLOSED";

        //response from back door
        public static readonly string RP_BACK_OPENED = "OPENED";
        public static readonly string RP_BACK_CLOSED = "CLOSED";









    }
}
