import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registrationUserName:string="";
  registrationPassword:string="";
  registrationAge:number=0;
  constructor(private router: Router,private userService:UserService) { }
  ngOnInit() {
  }
  PayBtClick() {
    this.userService.user = new User(1,this.registrationUserName,this.registrationPassword);
    this.userService.register().subscribe(
      good => {
        this.good = good;
        if (this.good) {
          swal('הרשמתך נקלטה בהצלחה');
      this.router.navigate(['/main']);
        } else {
          swal("!!!הרשמתך נכשלה - נסה שוב ");
      this.loading=false;
        }
      });
  }
  }

