import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { Appuser } from '../models/appuser';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
  providers: [UserService]
})
export class ManagerListComponent implements OnInit {

users: User[];
  constructor(private userService: UserService) { 

  }

  ngOnInit() {
    this.userService.getAll().subscribe(x => this.users = x.json());
    
  }
  BanManager(user: User)
  { 
    user.AppUser.IsBanned=true;
     this.userService.editUser(user).subscribe(
      x => {
        alert("User successfully banned!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("User can't be banned!");
      });
  }


  UnBanManager(user: User)
  { 
    user.AppUser.IsBanned=false;
     this.userService.editUser(user).subscribe(
      x => {
        alert("User successfully unbanned!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("User can't be unbanned!");
      });
  }
}
