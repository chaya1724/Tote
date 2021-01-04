export class Question {

    questionId: number;
    questionText:string
    emailFromSendQuestion: string;
    questionPath:string;

    constructor(Id:number, QuestionText: string,EmailFromSendQuestion: string,QuestionPath:string) {
      this.questionId = Id;
      this.questionText = QuestionText;
      this.emailFromSendQuestion = EmailFromSendQuestion;
      this.questionPath = QuestionPath;
    }
  }
  
