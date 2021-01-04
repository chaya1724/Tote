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
using Tore.Models;

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
        public async Task<IEnumerable<Question>> GetAllQuestion()
        {
            var SqlQuery = "SELECT * FROM question";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    var result = conn.Query<Question>(SqlQuery);
                    return result.ToList();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }
        public bool CreateQuestion(Question question)
        {
            var result = 0;
            var SqlQuery = "INSERT INTO tore.question(questionId,questionText,emailFromSendQuestion,questionPath) VALUES(@QuestionId,@QuestionText,@EmailFromSendQuestion,@QuestionPath)";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    result = conn.Execute(SqlQuery, new { question.QuestionId, question.QuestionText, question.EmailFromSendQuestion , question.QuestionPath });

                }
                catch (Exception e)
                {
                    throw e;
                    return false;
                }
                return true;
            }
        }
        public bool UpdateAnswer(Answer answer)
        {
            var result = 0;
            var SqlQuery = "INSERT INTO tore.answer(answerId,answerBody,questionId) VALUES(@AnswerId,@AnswerBody,@QuestionId)";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    result = conn.Execute(SqlQuery, new { answer.AnswerId, answer.AnswerBody, answer.QuestionId });

                }
                catch (Exception e)
                {
                    throw e;
                    return false;
                }
                return true;
            }
        }
        public async Task<IEnumerable<Answer>> getAllAnswers()
        {
            var SqlQuery = "SELECT * FROM tore.answer";

            using (IDbConnection conn = Connection)
            {
                try
                {
                    conn.Open();
                    var result = conn.Query<Answer>(SqlQuery);
                    return result.ToList();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }
        }

    }
}

