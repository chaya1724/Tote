import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Email } from 'src/Models/Email';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  subjecctText:string;
  bodyText:string;
  addressText:string;
  constructor(private mailService:MailService,private router: Router) { }

  ngOnInit() {
    this.subjecctText="";
    this.bodyText="";
    this.addressText="";
    this.mailService.email=new Email("","","")
  }
  onSubmit(contactForm: NgForm) {
    debugger;
    this.mailService.email.address=this.addressText;
    this.mailService.email.body=this.bodyText;
    this.mailService.email.subject=this.subjecctText;
    this.mailService.SendMail().subscribe(
    good => {debugger;
alert("!תזכה למצוות - תשובתך נשלחה בהצחה")  }
);
  }
}
