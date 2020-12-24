using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Entities
{
    public class User
    {
        public int Id { set; get; }
        public string Email { set; get; }
        public string Password { set; get; }

        public User() { }
        public User(int Id, string Email, string Password, int Age, int Points)
        {
            this.Id = Id;
            this.Email = Email;
            this.Password = Password;

        }
    }
}
