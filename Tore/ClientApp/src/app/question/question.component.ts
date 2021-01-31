import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/Models/Email';
import { MailService } from '../mail.service';
// import swal from 'sweetalert';
import { UserService } from '../user.service';
import { User } from 'src/models/User';
import { Question } from 'src/Models/Question';
import { Specifi } from 'src/Models/Specifi';
import { from as observableFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
declare var swal: any;
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionText: string = "";
  flag: number;
  flagUntilAnswers: any[] = [0];
  ListMailsToSend: string[] = [];
  specifisListDB: any[] = [];
  NoQuestionListShow: boolean = false;
  showAnswer: boolean = false;
  listMailsToSend: any[] = [];
  ListStringMailsToSend: string[] = [];

  constructor(public mailService: MailService, public userService: UserService, public router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    if (this.userService.flagLastQuestion == true) {
      this.showQuestionWhisAnswersForMainQuestion();
      this.userService.flagLastQuestion = false;
    }
    else {
      this.showQuestionWhisAnswers();
    }
    this.userService.user = new User(0, this.userService.user.Email, "");
  }
  QuestionSend() {
    if (this.questionText != "") {
      this.userService.question = new Question(this.userService.questionList.length + 1, this.questionText, this.userService.user.Email, this.userService.currentPath)
      this.userService.SendQuestion().subscribe(
        good => {
          swal('שאלתך נשלחה בהצלחה!', "תשובות ישלחו אליך למייל");
          this.showQuestionWhisAnswers()
          this.NoQuestionListShow = false;

          this.userService.getAllSpecifis().subscribe(
            specifiListFromDB => {
              this.specifisListDB = JSON.parse(specifiListFromDB); 
              for (let spesifi of this.specifisListDB) {
                if (spesifi.path == this.userService.currentPath) {
                  this.ListStringMailsToSend.push(spesifi.email);
                }
              }              
              for (let spesifiMail of this.ListStringMailsToSend)// שליחת מייל אם השאלה לכל האנשים שבקשו לקבל את השאלות של הדף/סעיף הזה 
              {
                this.listMailsToSend.push({ "address": spesifiMail, "body": this.questionText, "subject": this.userService.currentPath });
                // this.mailService.SendMail().subscribe();
              }
              observableFrom(this.listMailsToSend).pipe(
                // concatMap(entry => this.http.post<any>("https://localhost:44307/api/Mail/SendMail", entry))).
                concatMap(entry => this.http.post<any>("https://tore20210118023949.azurewebsites.net/api/Mail/SendMail", entry))).

                subscribe(response => { 
                swal('כמו כן שאלתך נשלחה למיילים של אנשים שרצו שאלות מדף זה - תודה') }, //do something with responses 
                  error => console.error(error), // so something on error
                  () => console.info("All requests done")); // do something when all requests are done );
            });
        });
    }
    else {
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
        this.userService.questionList = JSON.parse(questionListFromDB);//מקבל את כל השאלות מה DB
        this.userService.questionListShow = [];
        for (var q of this.userService.questionList) {
          if (q.questionPath == this.userService.currentPath) {//ממיין את כל השאלות לפי הדף הספציפי
            this.userService.questionListShow.push(q);
          }
        }
        if (this.userService.questionListShow.length == 0)//אם אין עדיין שאלות לדף הספציפי
          this.NoQuestionListShow = true;
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        this.userService.answerList = JSON.parse(answerListFromDB);//מקבל את כל התשובות מה DB
        this.userService.answerListShow = [];
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.id == a.questionId) {
              this.showAnswer = true;
              this.userService.answerListShow.push(a);
            }
          }
          this.flagUntilAnswers.push(this.userService.answerListShow.length);debugger
          console.log(this.flagUntilAnswers);
        }
      });
  }
  showQuestionWhisAnswersForMainQuestion() {
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
        this.userService.questionList = JSON.parse(questionListFromDB);//מקבל את כל השאלות מה DB
        this.userService.questionListShow = []; 
        for (var q of this.userService.questionList) {
          if (q.id == this.userService.lastQuestionId) {
            this.userService.questionListShow.push(q);
          }
        }
      });
    this.userService.getAllAnswers().subscribe(
      answerListFromDB => {
        this.userService.answerList = JSON.parse(answerListFromDB);//מקבל את כל התשובות מה DB
        this.userService.answerListShow = [];
        for (var q of this.userService.questionListShow) {
          for (var a of this.userService.answerList) {
            if (q.id == a.questionId) {
              this.showAnswer = true;
              this.userService.answerListShow.push(a);
              console.log(this.userService.lastQuestionId);
              console.log(this.userService.answerListShow);
            }
          }
          // this.flagUntilAnswers.push(this.userService.answerListShow.length);
        }
      });
  }
}


