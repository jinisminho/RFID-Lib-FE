using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibrarySelfCheckOut.Models
{
    public class CheckOutRequestModel
    {
        public int patronId { get; set; }
        public List<String> bookCodeList { get; set; }
    }
}
