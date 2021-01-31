import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/models/User';
import { UserService } from '../user.service';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  good: any;
  registrationEmail: string;
  registrationPassword: string;
  registrationAge: number = 0;
  constructor(public router: Router, public userService: UserService) { }
  ngOnInit() {
    this.userService.getAll()
      .subscribe(Users => {
        this.userService.Users = JSON.parse(Users);
      });
  }
  public isValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  Login() { }
  register() {
    this.userService.user.Email = this.registrationEmail;
    this.userService.user.Password = this.registrationPassword;
    if (this.userService.user.Email == null) {
      swal(' הזן כתובת מייל');
      return;
    }
    if (!this.isValid(this.userService.user.Email)) {
      swal(' כתובת מייל שגויה');
      return;
    }
    if (this.userService.user.Password == null || this.userService.user.Password.length < 8) {
      swal(' הזן סיסמא חזקה - לפחות 8 תווים');
      return;
    }
    for (let u of this.userService.Users) {
      if (u.email == this.userService.user.Email || u.password == this.userService.user.Password) {
        swal("מייל או סיסמא קיימים כבר - נסה משהו אחר");
        return;
      }
    }
    this.userService.user = new User(this.userService.Users.length + 1, this.userService.user.Email, this.userService.user.Password);
    this.userService.register().subscribe(
      good => {
        this.good = good;
        if (this.good) {
          swal('הרשמתך נקלטה בהצלחה');
          this.router.navigate(['/login']);
        } else {
          swal("!!!הרשמתך נכשלה - נסה שוב ");
          this.loading = false;
        }
      });
  }
}



