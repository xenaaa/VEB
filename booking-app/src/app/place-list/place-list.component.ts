import { Component, OnInit } from '@angular/core';
import { Region } from '../models/region';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  providers: [PlaceService]
})

export class PlaceListComponent implements OnInit {
  places: Place[];
  regionName: string;
  countryName: string
  regionId: number;
  countryId: number;
  place: Place;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private placeService: PlaceService) {
    activatedRoute.params.subscribe(params => { this.regionId = params["id"], this.regionName = params["name"], this.countryId = params["cid"], this.countryName = params["cname"] });
    this.places = [];
  }

  ngOnInit(): void {
    this.placeService.getPlaces(this.regionId).subscribe(x => this.places = x.json());
  }

  onSubmit(place: Place) {
    this.place = place;
    this.place.regionId = this.regionId;
    this.placeService.addPlace(this.place).subscribe(
      x => {
        alert("Place successfully added!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Place can't be added!");
      });
  }

  deletePlace(id) {
    this.placeService.deletePlace(id).subscribe(
      x => {
        alert("Place successfully deleted!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Place can't be deleted!");
      });
  }

  editPlace(place) {
    this.place = place
    this.placeService.editPlace(this.place).subscribe(
      x => {
        alert("Place successfully edited!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Place can't be edited!");
      });
  }
}
