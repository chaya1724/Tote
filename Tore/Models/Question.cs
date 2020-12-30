using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Question
    {
        public int QuestionId { set; get; }
        public string QuestionText { set; get; }
        public string EmailFromSendQuestion { set; get; }
        public string QuestionPath { set; get; }
        public string Answer { set; get; }

        public Question() { }
        public Question(int QuestionId, string QuestionText, string EmailFromSendQuestion, string QuestionPath)
        {
            this.QuestionId = QuestionId;
            this.QuestionText = QuestionText;
            this.EmailFromSendQuestion = EmailFromSendQuestion;
            this.QuestionPath = QuestionPath;
        }
    }
}
