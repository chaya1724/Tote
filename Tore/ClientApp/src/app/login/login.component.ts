import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
 import { UserService } from '../user.service';
// import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  Users: any[];
  i: any
   user: User;
  userNameText:string ="";
  passwordText:string ="";

  constructor(private router: Router,private userService:UserService) { }

  ngOnInit() {
    this.user=new User(0,this.userNameText,this.passwordText);
  }
  Login(){
    debugger;
    this.user.Email = this.userNameText;
    this.user.Password = this.passwordText;
    this.userService.getAll()
    .subscribe(Users => {
      this.Users = Users;
      for (let u of this.Users) {
        if (u.email == this.user.Email) {
          debugger;
          this.router.navigate(['/main']);
          return;
        }
      }
      alert("הפרטים שגויים - נסה שוב");
    });
  }
}


