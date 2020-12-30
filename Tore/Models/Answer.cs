using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Answer
    {
        public int AnswerId { set; get; }
        public int QuestionId { set; get; }
        public string AnswerBody { set; get; }

        public Answer() { }
        public Answer(int AnswerId, string AnswerBody, int QuestionId)
        {
            this.AnswerId = AnswerId;
            this.AnswerBody = AnswerBody;
            this.QuestionId = QuestionId;
        }
    }
}
