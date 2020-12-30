export class Answer {
    Id: number;
    answerBody: string;
    questionId:number;
   

    constructor(Id:number, Answer: string,questionId:number) {
    this.Id=Id;
    this.answerBody = Answer;
    this.questionId = questionId;
    }
}