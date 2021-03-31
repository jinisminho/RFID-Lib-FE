using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Utils
{
    public static class PriceFormatter
    {
        public static String formatToDecimal(double price)
        {
            if (price == (long)price)
                return String.Format("%d", (long)price);
            else
                return String.Format("%s", price);
        }
    }
}
