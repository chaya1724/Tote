import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { UserService } from '../user.service';
import swal from 'sweetalert';
import { Question } from 'src/Models/Question';
import { Answer } from 'src/Models/Answer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  emailText: string = "";
  passwordText: string = "";
  lastQustionId: number;
  lastQustionIdnum: any;
  loading:boolean=true;
  questionList:Question[]=[];
  userData:any[]=[{Id:1,Emaii:"chaya@gmail.com",Password:"111"}];
  questionData:any[]=[];


  constructor(public router: Router, public userService: UserService) {
  }
  ngOnInit() {
    this.getAllQuestionAndAnswrs();
  }
  Login() {
    this.userService.user.Email = this.emailText;
    this.userService.user.Password = this.passwordText;
    this.userService.getAll()
      .subscribe(
        UsersDB => {
        try{
          debugger
          console.log("return data request" , UsersDB)
          const data = JSON.parse(UsersDB);
          console.log("data from server" , data)
        this.userService.Users = data;
        console.log(this.userService.Users);
        for (let u of this.userService.Users) {
          if (u.email == this.userService.user.Email && u.password == this.userService.user.Password) {
            console.log(this.userService.Users)
            this.router.navigate(['/main']);
            return;
          }
        }
        swal("הפרטים שגויים - נסה שוב");
        }
        catch (e) {
          this.userService.Users=this.userData;
          console.log(this.userService.Users);
          console.log("Users gucs cv!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
     
      });
    }
  getAllQuestionAndAnswrs() {
    this.userService.getAllQuestion().subscribe(
      questionListFromDB => {
      try{
      this.questionList = JSON.parse(questionListFromDB);
        }
      catch (e) {
        questionListFromDB=this.questionData;
        console.log(questionListFromDB);
        console.log("questionList gucs cv!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      }
    });
  }

}



