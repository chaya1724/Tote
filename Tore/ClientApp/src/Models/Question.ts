export class Question {

    Id: number;
    QuestionText:string
    EmailFromSendQuestion: string;
    QuestionPath:string

    constructor(Id: number,QuestionText: string,EmailFromSendQuestion: string,QuestionPath:string) {
      this.Id = Id;
      this.QuestionText = QuestionText;
      this.EmailFromSendQuestion = EmailFromSendQuestion;
      this.QuestionPath = QuestionPath;
    }
  }
  