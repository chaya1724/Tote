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
  questionText: string;
  flag:number;
  NoQuestionListShow: boolean = false;
  questionListShow: any[];
  answerListShow: any[];
  showAnswer: boolean = false;
  constructor(private mailService: MailService, private userService: UserService, private router: Router) {
    this.userService.questionList = new Array<Question>();
    this.questionListShow = new Array<any>();
    this.answerListShow = new Array<any>();

  }

  ngOnInit() {
    this.userService.user = new User(0, this.userService.user.Email, "");
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        this.userService.questionList = questionListFromDB;
        for (var q of this.userService.questionList) {
          if (q.questionPath == this.mailService.selectedMaseches) {
            this.questionListShow.push(q);
          }
          if (q.answer != null) {
            this.showAnswer = true;
          }
        }
        if (this.questionListShow.length == 0)
          this.NoQuestionListShow = true;
        console.log(this.userService.questionList);
        console.log(this.userService.answerList);
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        this.userService.answerList = answerListFromDB;
        for (var q of this.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.questionId == a.questionId) {
              debugger;
               this.flag=q.questionId
               this.answerListShow.push(a);
            }
          }
        }
      });
  }
  QuestionSend() {
    debugger;
    this.userService.question = new Question(this.userService.questionList.length + 1, this.questionText, this.userService.user.Email, this.mailService.selectedMaseches)// + this.mailService.selectedpage
    this.userService.SendQuestion().subscribe(
      good => {
        if (good)
          swal('שאלתך נשלחה בהצלחה!', "תשובות ישלחו אליך למייל");
        else {
          swal("יש בעיה בשליחת השאלה");

        }
      }
    );
  }
  Answer() {
    this.router.navigate(['/answer']);
  }
}
