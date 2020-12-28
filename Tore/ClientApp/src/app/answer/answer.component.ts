import { Component, OnInit } from '@angular/core';
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
    this.addressText = "";
    this.mailService.email = new Email("", "", "")
  }
  onSubmit() {
    debugger;
    if (this.addressText != "") {
      this.mailService.email.address = this.userService.user.Email;
      this.mailService.email.body = this.bodyText;
      this.mailService.email.subject = this.mailService.selectedMaseches;
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
