using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Answer
    {
        [Key]
        public int Id { set; get; }
        public int QuestionId { set; get; }
        public string AnswerBody { set; get; }

        public Answer() { }
        public Answer(int AnswerId, string AnswerBody, int QuestionId)
        {
            this.Id = AnswerId;
            this.AnswerBody = AnswerBody;
            this.QuestionId = QuestionId;
        }
    }
}
