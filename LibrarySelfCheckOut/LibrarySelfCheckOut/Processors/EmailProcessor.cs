using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LibrarySelfCheckOut.APIs;
using LibrarySelfCheckOut.Models;

namespace LibrarySelfCheckOut.Processors
{
    public class EmailProcessor
    {

        public async static Task emailCheckOut(EmailCheckOutRequest request)
        {
            await EmailAPI.emailCheckOut(request);
        }

        public async static Task emailReturn(List<BookReturnModel> request)
        {
            await EmailAPI.emailReturn(request);
        }
    }
}
