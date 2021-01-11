import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/models/User';
import { UserService } from '../user.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  good: boolean;
  registrationEmail:string="";
  registrationPassword:string="123";
  registrationAge:number=0;
  constructor(public router: Router,public userService:UserService) { }
  ngOnInit() {
    this.userService.getAll()
    .subscribe(Users => {
      this.userService.Users = Users;
    });
  }
public isValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
Login()
{}
  register() {debugger
    if(this.registrationEmail=="")
    swal(' הזן כתובת מייל');
    if(!this.isValid(this.registrationEmail)){
      swal(' כתובת מייל שגויה');
      return;
      }
      if(this.registrationPassword=="")
      swal('הזן סיסמא חזקה');
    this.userService.user = new User(this.userService.Users.length+1,this.registrationEmail,this.registrationPassword);
    this.userService.register().subscribe(
      good => {
        this.good = good;
        if (this.good) {
          swal('הרשמתך נקלטה בהצלחה');
      this.router.navigate(['/login']);
        } else {
          swal("!!!הרשמתך נכשלה - נסה שוב ");
      this.loading=false;
        }
      });
  }
  }

