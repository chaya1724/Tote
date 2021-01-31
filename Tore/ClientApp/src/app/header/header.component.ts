import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
  }
  specificClicked()
  {
    this.router.navigate(['/spcific']);
  }
  back() {
    if (this.userService.flagSelectedPage == true) {
    //   this.userService.flagSelectedPage = false;
    //   this.flagMasechesSelected=false;
    //   this.spezhifiSelected = false;
    //   this.spezhifiSelected1 = true;
    //   this.hide=true;
    }
    else {
      this.router.navigate(['/main']);
    }
  }
  about(){
    this.router.navigate(['/about']);
  }
  contectUs() {}
  mainPage(){
    this.router.navigate(['/login']);
  }
  privateArea(){}
}
