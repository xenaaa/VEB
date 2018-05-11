import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from '../models/room';
import { RoomReservation } from '../models/room-reservation';

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
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css'],
  providers: [RoomService, AccommodationService, LoginService, RoomReservationService]

})
export class RoomReservationComponent implements OnInit {
  UserId: number;
  roomReservations: RoomReservation[];
  roomReservation: RoomReservation;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private roomService: RoomService, private roomReservationService: RoomReservationService, private loginService: LoginService, private accommodationService: AccommodationService, ) {
    this.roomReservations = [];
    this.roomReservation = new RoomReservation();
  }

  ngOnInit(): void {
    this.UserId = this.loginService.getUserId();
    this.roomReservationService.getRoomReservations(this.UserId).subscribe(x => this.roomReservations = x.json());
  }

  deleteRoomReservation(reservation: RoomReservation) {
    this.roomReservationService.deleteRoomReservation(reservation.Id).subscribe(
      x => {
        alert("Room reservation successfully deleted!");
        window.location.reload();
      },
      err => {
        alert("Room reservation can't be deleted!");
      });
  }

  editRoomReservation(reservation: RoomReservation, id: number) {
    debugger
    reservation.AppUserId = this.UserId;
    reservation.RoomId = id;
    this.roomReservationService.putRoomResrvation(reservation).subscribe(
      x => {
        alert("Room reservation successfully edited!");
        window.location.reload();
      },
      err => {
        alert("Room reservation can't be deleted!");
      })
  }
  showModal(show: boolean, reservation: RoomReservation) {
    if (show) {
      document.getElementById(reservation.Id.toString()).style.display = 'block';
    } else {
      document.getElementById(reservation.Id.toString()).style.display = 'none';
    }
  }
}
