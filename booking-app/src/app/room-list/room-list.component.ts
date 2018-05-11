import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../models/room';
import { RoomReservation } from '../models/room-reservation';
import { LoginUser} from '../models/login-user';
import { Accommodation } from '../models/accommodation';
import { RoomService } from '../services/room.service';
import { LoginService } from '../services/login.service';
import { RoomReservationService } from '../services/room-reservation.service';


import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AccommodationService } from '../services/accommodation.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
  providers: [RoomService, AccommodationService, LoginService, RoomReservationService]

})
export class RoomListComponent implements OnInit {
  rooms: Room[];
  room: Room;
  id: number
  roomNumber: number
  bedCount: number;
  description: string;
  PricePerNight: number;
  accommodationId: number;
  accommodationName: string;

  UserId: number;
  roomReservation: RoomReservation;

  accommodation: Accommodation;

  public user: LoginUser;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private roomService: RoomService, private roomReservationService: RoomReservationService, private loginService: LoginService, private accommodationService: AccommodationService, ) {

    activatedRoute.params.subscribe(params => { this.accommodationId = params["id"], this.accommodationName = params["name"] });
    this.rooms = [];
    this.accommodation = new Accommodation();
    this.room = new Room();
    this.roomReservation = new RoomReservation();
    this.UserId = loginService.getUserId();

  }

  ngOnInit(): void {
    debugger
    this.roomService.getRooms(this.accommodationId).subscribe(x => this.rooms = x.json());
    this.accommodationService.getAccommodation(this.accommodationId).subscribe(x => this.accommodation = x.json());
  }

  onSubmit(room: Room) {
    debugger
    this.room = room;
    this.room.AccomodationId = this.accommodationId;
    this.roomService.addRoom(this.room).subscribe(
      x => {
        alert("Room successfully added!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Room can't be added!");
      });

  }
  onSubmitRR(roomReservation: RoomReservation, roomId: number) {
    debugger
    this.roomReservation = roomReservation;
    this.roomReservation.RoomId = roomId;
    this.roomReservation.AppUserId = this.UserId;
    this.roomReservationService.addRoomReservation(this.roomReservation).subscribe(
      x => {
        alert("Room reservation successfully added!");
        this.router.navigate(['/roomreservations']);
      },
      err => {
        alert("Room reservation can't be added!");
      });
  }


  deleteRoom(id) {
    this.roomService.deleteRoom(id).subscribe(
      x => {
        alert("Room successfully deleted!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Room can't be deleted!");
      });
  }

  editRoom(room) {
    this.room = room
    this.roomService.editRoom(this.room).subscribe(
      x => {
        alert("Room successfully edited!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Room can't be edited!");
      });
    }

    isManager(): boolean {

      return this.loginService.isManager();
  
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
