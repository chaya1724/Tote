using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Email
    {
        public string Subject { set; get; }
        public string Body { set; get; }
        public string Address { set; get; }
        public Email() { }
        public Email(string subject, string body, string address)
        {
            this.Subject = subject;
            this.Body = body;
            this.Address = address;
        }
    }
}
