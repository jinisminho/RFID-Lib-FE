using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DropBoxUI.Models
{
    public class ReturnRequestModel
    {
        public string bookRfid { get; set; }

        public ReturnRequestModel(string bookRfid)
        {
            this.bookRfid = bookRfid;
        }
    }
}
