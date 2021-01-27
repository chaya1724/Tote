import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/Models/Email';
import { MailService } from '../mail.service';
import swal from 'sweetalert';
import { UserService } from '../user.service';
import { User } from 'src/models/User';
import { Question } from 'src/Models/Question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionText: string="";
  flag: number;
  flagUntilAnswers: any[] = [0];
  NoQuestionListShow: boolean = false;
  showAnswer: boolean = false;

  constructor(public mailService: MailService, public userService: UserService, public router: Router) {
  }

  ngOnInit() {debugger
    if(this.userService.flagLastQuestion==true){
      this.showQuestionWhisAnswersForMainQuestion();
      this.userService.flagLastQuestion=false;
    }
    else{debugger
    this.showQuestionWhisAnswers();
   }
   this.userService.user = new User(0, this.userService.user.Email, "");
  }
  QuestionSend() {
    if(this.questionText!=""){
    this.userService.question = new Question(this.userService.questionList.length + 1, this.questionText, this.userService.user.Email, this.userService.currentPath)
    this.userService.SendQuestion().subscribe(
      good => {
        swal('שאלתך נשלחה בהצלחה!', "תשובות ישלחו אליך למייל");
        this.showQuestionWhisAnswers()
        this.NoQuestionListShow=!this.NoQuestionListShow;
      });
    }
    else{
      swal("אנא הכנס שאלה");
    }
  }
  Answer(indexOfQues) {
    this.userService.indexOfQustion = indexOfQues;
    console.log(this.userService.indexOfQustion);
    this.router.navigate(['/answer']);
  }
  showQuestionWhisAnswers() {
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        this.userService.questionList =  JSON.parse(questionListFromDB);//מקבל את כל השאלות מה DB
        this.userService.questionListShow=[];
        for (var q of this.userService.questionList) {
          if (q.questionPath == this.userService.currentPath) {//ממיין את כל השאלות לפי הדף הספציפי
            this.userService.questionListShow.push(q);
          }
        }        
        if (this.userService.questionListShow.length == 0)//אם אין עדיין שאלות לדף הספציפי
          this.NoQuestionListShow = true;
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {debugger
        this.userService.answerList =  JSON.parse(answerListFromDB);//מקבל את כל התשובות מה DB
        this.userService.answerListShow=[];
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.id == a.questionId) {
              this.showAnswer = true;
              this.userService.answerListShow.push(a);
            }
          }
          this.flagUntilAnswers.push(this.userService.answerListShow.length);
        }
      });
  }
  showQuestionWhisAnswersForMainQuestion()
  {
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        this.userService.questionList =  JSON.parse(questionListFromDB);//מקבל את כל השאלות מה DB
        this.userService.questionListShow=[];debugger
        for (var q of this.userService.questionList) {
          if (q.id == this.userService.lastQuestionId) {
            this.userService.questionListShow.push(q);
          }
        }        
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        this.userService.answerList =  JSON.parse(answerListFromDB);//מקבל את כל התשובות מה DB
        this.userService.answerListShow=[];debugger;
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.id == a.questionId) {
              this.showAnswer = true;
              this.userService.answerListShow.push(a);
              console.log(this.userService.lastQuestionId);
              console.log( this.userService.answerListShow);
            }
          }
          // this.flagUntilAnswers.push(this.userService.answerListShow.length);
        }
      });
  }
}


