using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Specifi
    {

        [Key]
        public int Id { set; get; }
        public string Email { set; get; }
        public string Path { set; get; }

        public Specifi() { }
        public Specifi(int Id, string Email, string Path)
        {
            this.Id = Id;
            this.Email = Email;
            this.Path = Path;

        }
    }
}
