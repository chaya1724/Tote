using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tore.Models
{
    public class Question
    {
        [Key]
        public int Id { set; get; }
        public string QuestionText { set; get; }
        public string EmailFromSendQuestion { set; get; }
        public string QuestionPath { set; get; }

        public Question() { }
        public Question(int QuestionId, string QuestionText, string EmailFromSendQuestion, string QuestionPath)
        {
            this.Id = QuestionId;
            this.QuestionText = QuestionText;
            this.EmailFromSendQuestion = EmailFromSendQuestion;
            this.QuestionPath = QuestionPath;
        }
    }
}
