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
  constructor(private mailService: MailService, private userService: UserService) { }

  ngOnInit() {
    this.subjecctText = "";
    this.bodyText = "";
    this.addressText ="pinchas1724@gmail.com";
    this.mailService.email = new Email("", "", "")
  }
  onSubmit() {
    debugger;
//////////////////////////////צריך לדאוג ל questionId אמיתי!!!!!!!!!!!!!!!!!!!!!!!!
    var QuestionId = this.userService.questionList.length
    this.userService.answer=new Answer(this.userService.answerList.length,this.bodyText,QuestionId) 
    this.userService.SendAnswer().subscribe(
      good => {
        swal('"!תזכה למצוות - תשובתך נשלחה בהצלחה"');
      });
    
     
    if (this.addressText != "") {
      this.mailService.email.address = this.userService.questionList[1].emailFromSendQuestion;
      this.mailService.email.body = this.bodyText;
      this.mailService.email.subject ="מסכת"+this.mailService.selectedMaseches+",דף"+this.mailService.selectedpage;
      this.mailService.SendMail().subscribe(
        good => {
          swal('"!תזכה למצוות - תשובתך נשלחה בהצלחה"');
        }
      );
    }
    else {
      swal('אנא הזן כתובת מייל');
    }
  }
}
