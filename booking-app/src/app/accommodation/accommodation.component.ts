import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { Comment } from '../models/comment';

import { AccommodationService } from '../services/accommodation.service';
import { LoginService } from '../services/login.service';
import { CommentService } from '../services/comment.service';

import { LoginUser } from '../models/login-user';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css'],
  providers: [AccommodationService, LoginService, CommentService]
})
export class AccommodationComponent implements OnInit {

  accId: number;
  UserId: number;
  accommodation: Accommodation;

  url: string = "http://localhost:54042/";

  comments: Comment[];
  comment: Comment;

  public user: LoginUser;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private accommodationService: AccommodationService,
    private loginService: LoginService,
    private commentService: CommentService
  ) {
    debugger
    activatedRoute.params.subscribe(params => { this.accId = params["id"] });
  }

  ngOnInit() {
    this.accommodationService.getAccommodation(this.accId).subscribe(x => this.accommodation = x.json());
    this.UserId = this.loginService.getUserId();
    this.commentService.getComments(this.accId).subscribe(x => this.comments = x.json());

  }

  refresh() {
    this.commentService.getComments(this.accId).subscribe(x => this.comments = x.json());
  }
  editAccommodation(accommodation: Accommodation) {
    debugger

    this.accommodation = accommodation;
    this.accommodationService.editAccommodation(this.accommodation).subscribe
      (x => {
        alert("Accommodation edited successfuly!");
        window.location.reload();
      },
      x => alert(x.json().Message));
  }

  deleteAccommodation(id) {
    this.accommodationService.deleteAccommodation(id).subscribe(
      x => {
        alert("Accommodation deleted successfuly!");
        this.router.navigate(['/accommodationlist'])
      },
      err => {
        alert("Accommodation can't be deleted!");
      });

  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  onSubmitComment(comment: Comment, form: NgForm) {
    let id = this.loginService.getUserId();
    comment.AppUserId = id;
    comment.AccommodationId = this.accId;
    this.commentService.addComment(comment).subscribe(
      x => {
        alert("Comment successfully added!");
        window.location.reload();
      },
      err => {
        alert("Comment can't be added before stay!");
        form.reset();
      });
  }
  deleteComment(id1, id2) {
    this.commentService.deleteComment(id1, id2).subscribe(
      x => {
        alert("Comment successfully deleted!");
        window.location.reload();
      },
      err => {
        alert("Comment can't be deleted!");
      });
  }

  isManager(): boolean {

    return this.loginService.isManager();

  }

  approveAccommodation(accommodation: Accommodation) {
    debugger
    accommodation.Approved = true;
    this.accommodationService.editAccommodation(accommodation).subscribe(
      x => {
        alert("Accommodation successfully approved!");
        //   this.http.notify('Manager').subscribe(data => window.location.reload());    

        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("Accommodation can't be approved!");
      });
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

}
