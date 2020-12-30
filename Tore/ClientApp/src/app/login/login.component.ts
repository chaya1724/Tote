import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
 import { UserService } from '../user.service';
 import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
   user: User;
  emailText:string ="";
  passwordText:string ="";

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    // this.user=new User(0,this.emailText,this.passwordText);
  }
  Login(){
    debugger;
    this.userService.user.Email = this.emailText;
    this.userService.user.Password = this.passwordText;
    this.userService.getAll()
    .subscribe(Users => {
      this.userService.Users = Users;
      for (let u of this.userService.Users) {          debugger;
        if (u.email == this.userService.user.Email&&u.password == this.userService.user.Password) {
          this.router.navigate(['/main']);
          return;
        }
      }
      swal("הפרטים שגויים - נסה שוב");
    });
  }
}



