using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace rfid_security_controller.models
{
    public class BookListResponse
    {
        public bool isSuccess { get; set; }
        public string errorMessage { get; set; }
        public List<String> rfids { get; set; }

        public BookListResponse(bool isSuccess, string errorMessage, List<string> rfids)
        {
            this.isSuccess = isSuccess;
            this.errorMessage = errorMessage;
            this.rfids = rfids;
        }
    }
}
