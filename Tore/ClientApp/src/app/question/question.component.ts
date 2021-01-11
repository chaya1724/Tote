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
  answerListShow: any[];
  showAnswer: boolean = false;

  constructor(public mailService: MailService, public userService: UserService, public router: Router) {
    this.userService.questionList = new Array<Question>();
    this.userService.questionListShow = new Array<any>();
    this.answerListShow = new Array<any>();
  }

  ngOnInit() {debugger
    // if(this.userService.currentPath==null)
    // this.userService.currentPath = this.userService.getCurrentPath();debugger
    this.userService.user = new User(0, this.userService.user.Email, "");
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        this.userService.questionList = questionListFromDB;//מקבל את כל השאלות מה DB
        for (var q of this.userService.questionList) {
          if (q.questionPath == this.userService.currentPath) {//ממיין את כל השאלות לפי הדף הספציפי
            this.userService.questionListShow.push(q);
          }
        }
        if (this.userService.questionListShow.length == 0)//אם אין עדיין שאלות לדף הספציפי
          this.NoQuestionListShow = true;
        console.log(this.userService.questionList);
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {debugger
        this.userService.answerList = answerListFromDB;//מקבל את כל התשובות מה DB
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.Id == a.questionId) {
              this.showAnswer = true;
              this.answerListShow.push(a);debugger
            }
          }
          this.flagUntilAnswers.push(this.answerListShow.length);
        }
        console.log(this.userService.questionListShow);
        console.log(this.answerListShow);
        console.log(this.flagUntilAnswers);
      });
  }
  QuestionSend() {debugger
    if(this.questionText!=""){
    this.userService.question = new Question(this.userService.questionList.length + 1, this.questionText, this.userService.user.Email, this.userService.currentPath)
    this.userService.SendQuestion().subscribe(
      good => {
        swal('שאלתך נשלחה בהצלחה!', "תשובות ישלחו אליך למייל");
        this.showQuestionWhisAnswers()
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
        this.userService.questionList = questionListFromDB;//מקבל את כל השאלות מה DB
        for (var q of this.userService.questionList) {
          if (q.questionPath == this.userService.currentPath) {//ממיין את כל השאלות לפי הדף הספציפי
            this.userService.questionListShow.push(q);
          }
        }
        if (this.userService.questionListShow.length == 0)//אם אין עדיין שאלות לדף הספציפי
          this.NoQuestionListShow = true;
        console.log(this.userService.questionList);
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        this.userService.answerList = answerListFromDB;//מקבל את כל התשובות מה DB
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.Id == a.questionId) {
              this.showAnswer = true;
              this.answerListShow.push(a);
            }
          }
          this.flagUntilAnswers.push(this.answerListShow.length);
        }
        console.log("questionListShow:        " + this.userService.questionListShow);
        console.log("answerListShow:        " + this.answerListShow);
        console.log("flagUntilAnswers:        " + this.flagUntilAnswers);
      });
  }
}


