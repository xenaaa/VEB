import { Component, OnInit } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { AccommodationTypeService } from '../services/accommodation-type.service';
import { User } from '../models/user';
import { Place } from '../models/place';
import { AccommodationType } from '../models/accommodation-type';

import {
  Router,
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-accommodation-type-list',
  templateUrl: './accommodation-type-list.component.html',
  styleUrls: ['./accommodation-type-list.component.css'],
  providers: [AccommodationTypeService]
})
export class AccommodationTypeListComponent implements OnInit {

  accommodationTypes: AccommodationType[];
  accommodationType: AccommodationType;

  constructor(private accommodationTypeService: AccommodationTypeService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.accommodationTypes = []
    this.accommodationType = new Accommodation();
  }

  ngOnInit() {
    this.accommodationTypeService.getAll().subscribe(x => this.accommodationTypes = x.json());
  }

  onSubmit(accommodationType: AccommodationType) {
    this.accommodationType = accommodationType;
    this.accommodationTypeService.addAccommodationType(this.accommodationType).subscribe(
      x => {
        alert("Accommodation type successfully added!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("Accommodation type can't be added!");
      });
  }

  deleteAccommodationType(id) {
    this.accommodationTypeService.deleteAccommodationType(id).subscribe(
      x => {
        alert("Accommodation type successfully deleted!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Accommodation type can't be deleted!");
      });

  }

  editAccommodationType(accommodationType) {
    this.accommodationType = accommodationType;
    this.accommodationTypeService.editAccommodationType(this.accommodationType).subscribe(
      x => {
        alert("Accommodation type successfully edited!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Accommodation type can't be edited!");
      });
  }
}