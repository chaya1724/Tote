using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tore.Entities;

namespace Tore.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public bool CreateUser(User userAcount);
    }
}
