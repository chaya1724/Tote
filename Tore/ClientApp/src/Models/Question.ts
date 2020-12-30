export class Question {

    quesrionId: number;
    questionText:string
    emailFromSendQuestion: string;
    questionPath:string;
    answer:string;

    constructor(Id:number, QuestionText: string,EmailFromSendQuestion: string,QuestionPath:string) {
      this.quesrionId = Id;
      this.questionText = QuestionText;
      this.emailFromSendQuestion = EmailFromSendQuestion;
      this.questionPath = QuestionPath;
    }
  }
  ////////////////////////////////////////////
  
