export class Question {

    id: number;
    questionText:string
    emailFromSendQuestion: string;
    questionPath:string;

    constructor(Id:number, QuestionText: string,EmailFromSendQuestion: string,QuestionPath:string) {
      this.id = Id;
      this.questionText = QuestionText;
      this.emailFromSendQuestion = EmailFromSendQuestion;
      this.questionPath = QuestionPath;
    }
  }
  
