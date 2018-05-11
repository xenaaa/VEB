import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { RegistrationService } from '../services/registration.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginUser } from '../models/login-user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Name: string;
  LastName: string;
  Username: string;
  Role: string;
  isManager: boolean = false;
  Message: string = "";
  Manager: string;
  user: RegisterUser;
  userLogin: LoginUser;

  constructor(private registerService: RegistrationService, private router: Router,
    private activatedRoute: ActivatedRoute, private loginService: LoginService) {
    this.userLogin = new LoginUser();
  }

  ngOnInit() {
  }

  onSubmit(user: RegisterUser) {

    this.user = user;
    this.user.IsBanned = false;

    this.registerService.register(this.user).subscribe(
      data => {
        this.userLogin.username = this.user.Username;
        this.userLogin.password = this.user.Password;
        debugger
        this.loginService.logIn(this.userLogin);
        this.router.navigate(['/accommodationlist']);
      },
      error => {
        alert("Registration failed");
      });
  }
}
