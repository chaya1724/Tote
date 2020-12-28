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
  constructor(private mailService: MailService, private userService: UserService, private router: Router)
   { 
     this.userService.questionList=new Array<Question>();
   }

  ngOnInit() {
    this.userService.user = new User(0, this.userService.user.Email, "");
    this.userService.getAllQuestion().subscribe(
      questionList=>{
      this.userService.questionList=questionList;
      console.log(this.userService.questionList);
      });
  }
  QuestionSend() {
    debugger;
    this.userService.question = new Question(1, this.questionText, this.userService.user.Email, this.mailService.selectedMaseches)// + this.mailService.selectedpage
    this.userService.SendQuestion().subscribe(
      good => {
        swal('שאלתך נשלחה בהצלחה!', "תשובות ישלחו אליך למייל");
      }
    );
  }
  Answer() {
    this.router.navigate(['/answer']);
  }
}
