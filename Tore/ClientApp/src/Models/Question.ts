export class Question {

    Id: number;
    questionText:string
    emailFromSendQuestion: string;
    questionPath:string;

    constructor(Id:number, QuestionText: string,EmailFromSendQuestion: string,QuestionPath:string) {
      this.Id = Id;
      this.questionText = QuestionText;
      this.emailFromSendQuestion = EmailFromSendQuestion;
      this.questionPath = QuestionPath;
    }
  }
  
