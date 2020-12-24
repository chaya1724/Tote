using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Tore.Entities;
using Tore.Interfaces;

namespace Tore.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;

        public IDbConnection Connection
        {
            get
            {
                MySqlConnection sqlConnection = new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
                return sqlConnection;
            }
        }
        public UserService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var SqlQuery = "SELECT * FROM user";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    var result = conn.Query<User>(SqlQuery);
                    return result.ToList();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }
        public bool CreateUser(User user)
        {
            var result = 0;
            var SqlQuery = "INSERT INTO tore.user(userId, email, password) VALUES(@Id,@Email,@Password)";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    result = conn.Execute(SqlQuery, new { user.Id, user.Email, user.Password });

                }
                catch (Exception e)
                {
                    throw e;
                    return false;
                }
                return true;
            }
        }
    }
}

