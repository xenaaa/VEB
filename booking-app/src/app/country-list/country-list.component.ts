import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { CountryService } from '../services/country.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  providers: [CountryService]
})
export class CountryListComponent implements OnInit {

  countries: Country[];
  country: Country;

  constructor(private countryService: CountryService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.countries = []
    this.country = new Country();
  }

  ngOnInit() {
    this.countryService.getAll().subscribe(x => this.countries = x.json());
  }

  onSubmit(country: Country) {
    this.country = country;
    this.countryService.addCountry(this.country).subscribe(
      x => {
        alert("Country successfully added!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("Country can't be added!");
      });
  }

  deleteCountry(id) {
    this.countryService.deleteCountry(id).subscribe(
      x => {
        alert("Country successfully deleted!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("Country can't be deleted!");
      });
  }


  editCountry(country) {
    this.country = country;
    this.countryService.editCountry(this.country).subscribe(
      x => {
        alert("Country successfully edited!");
        window.location.reload();
      },
      err => {
        //  x => alert(x.json().Message));
        alert("Country can't be edited!");
      });
  }
}
