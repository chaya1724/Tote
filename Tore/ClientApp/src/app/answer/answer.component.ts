import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/Models/Answer';
import { Email } from 'src/Models/Email';
import  swal from 'sweetalert';
import { MailService } from '../mail.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  subjecctText: string;
  bodyText: string;
  addressText: string;
  QuestionIdnum:number;
  constructor(private mailService: MailService, private userService: UserService) { }

  ngOnInit() {
    this.subjecctText = "";
    this.bodyText = "";
    this.addressText ="pinchas1724@gmail.com";
    this.mailService.email = new Email("", "", "")
  }
  sendAns() {
    this.QuestionIdnum = this.userService.questionListShow[this.userService.indexOfQustion].questionId;
    this.mailService.email.address = this.userService.questionListShow[this.userService.indexOfQustion].emailFromSendQuestion;
    this.mailService.email.body =  this.userService.questionListShow[this.userService.indexOfQustion].questionText+"\n"+this.bodyText;
    this.mailService.email.subject =this.userService.currentPath;

    this.userService.answer=new Answer(this.userService.answerList.length,this.bodyText,this.QuestionIdnum) 
    this.userService.SendAnswer().subscribe(//הכנסת התשובה ל DB
      good => {
        swal('"!תזכה למצוות - תשובתך נשלחה בהצלחה"');
      });debugger
      this.mailService.SendMail().subscribe();



    if (this.addressText != "") {
      
    }
    else {
      swal('כדי לשלוח תשובה היכנס למערכת תחילה');
    }
  }
}
