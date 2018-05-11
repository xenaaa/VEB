import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginUser } from '../models/login-user';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  Message: string;

  Admin: boolean;
  Manager: boolean

  public user: LoginUser;

  constructor(private loginService: LoginService, private router: Router) {
    if (this.isLoggedIn()) {
      this.user = new LoginUser(null, null, localStorage.getItem("username"));
    }

  }

  ngOnInit() {

  }


  onSubmit(user: LoginUser, ngform: NgForm) {
    this.loginService.logIn(user);

  }

  logOut() {
    this.loginService.logOut();
    this.Admin = undefined;
    this.Manager = undefined;
    this.user = undefined
    window.location.reload();

  }

  isLoggedIn(): boolean {

    if(this.loginService.isLoggedIn())
    {
      this.user = new LoginUser(null, null, localStorage.getItem("username"));
        return true;
    }
    else
    {
        return false;
    }
  }

  isAdmin(): boolean {
    if (this.Admin == undefined) {
      this.Admin = this.loginService.isAdmin();
    }
    return this.Admin;
  //  return this.loginService.isAdmin();
    

  }

  isManager(): boolean {
    if (this.Manager == undefined) {
      this.Manager = this.loginService.isManager();
    }
    return this.Manager;
  //  return this.loginService.isManager();

  }


  goToAccommodation() {
    debugger
    let id = this.loginService.getUserId();
    this.router.navigate(['/accommodationlist', id])

  }
}
