using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tore.Entities;
using Tore.Models;


namespace Tore.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAllUsers();
        public bool CreateUser(User userAcount);
        public Task<IEnumerable<Question>> GetAllQuestion();
        public bool CreateQuestion(Question question);

        
    }
}
