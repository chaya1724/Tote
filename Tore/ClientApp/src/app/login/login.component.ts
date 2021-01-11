import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { UserService } from '../user.service';
import swal from 'sweetalert';
import { Question } from 'src/Models/Question';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  user: User;
  emailText: string = "";
  passwordText: string = "";
  isCollapsed: boolean = true;
  answerListShow: any[];
  lastQustionId: number;
  lastQustionIdnum: any;
  questionText: string;
  flag: number;
  flagUntilAnswers: any[] = [0];
  NoQuestionListShow: boolean = false;
  showAnswer: boolean = false;
  loading:boolean=true;
  spezhifiSelected:boolean=false;
  constructor(public router: Router, public userService: UserService) {
    this.userService.questionList = new Array<Question>();
    this.userService.questionListShow = new Array<any>();
    this.answerListShow = new Array<any>();
    
    // this.flagUntilAnswers=new Array<any>();
  }
  ngOnInit() {
    this.getAllQuestionAndAnswrs();
  }
 
  Login() {
    this.userService.user.Email = this.emailText;
    this.userService.user.Password = this.passwordText;
    this.userService.getAll()
      .subscribe(Users => {debugger;
        this.userService.Users = Users;
        for (let u of this.userService.Users) {
          if (u.email == this.userService.user.Email && u.password == this.userService.user.Password) {
            console.log(this.userService.Users)
            this.router.navigate(['/main']);
            return;
          }
        }
        swal("הפרטים שגויים - נסה שוב");
      });
  }
  getAllQuestionAndAnswrs() {
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        debugger;
        this.userService.questionList = questionListFromDB;//מקבל את כל השאלות מה DB
        this.lastQustionIdnum = this.userService.questionList.length - 1;
        this.lastQustionId = this.userService.questionList[this.lastQustionIdnum].Id;
        for (var q of this.userService.questionList) {
          if (q.Id > this.lastQustionId - 10) {//ממיין את כל השאלות לפי הדף הספציפי
            this.userService.questionListShow.push(q);
          }
        }
        if (this.userService.questionListShow.length == 0)//אם אין עדיין שאלות לדף הספציפי
          this.NoQuestionListShow = true;
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        debugger
        this.userService.answerList = answerListFromDB;//מקבל את כל התשובות מה DB
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.questionId == a.questionId) {
              this.showAnswer = true;
              this.answerListShow.push(a); debugger;
            }
          } debugger
          this.flagUntilAnswers.push(this.answerListShow.length);
        }
        console.log("questionListShow  " + this.userService.questionListShow);
        console.log("answerListShow  " + this.answerListShow.toString());
        console.log(this.flagUntilAnswers);
      });
  }
}



