import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country';
import { Region } from '../models/region';
import { RegionService } from '../services/region.service';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css'],
  providers: [RegionService]
})
export class RegionListComponent implements OnInit {
  countryId: number;
  countryName: string;
  regions: Region[];
  region: Region;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private regionService: RegionService) {
    activatedRoute.params.subscribe(params => { this.countryId = params["id"], this.countryName = params["name"] });
    this.regions = [];
    this.region = new Region();
  }


  ngOnInit(): void {
    this.regionService.getRegions(this.countryId).subscribe(x => this.regions = x.json());
  }

  onSubmit(region: Region) {
    this.region = region;
    this.region.countryId = this.countryId;
    this.regionService.addRegion(this.region).subscribe(
      x => {
        alert("Region successfully added!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Region can't be added!");
      });
  }

  deleteRegion(id) {
    this.regionService.deleteRegion(id).subscribe(
      x => {
        alert("Region successfully deleted!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Region can't be deleted!");
      });
  }

  editRegion(region) {
    this.region = region
    this.regionService.editRegion(this.region).subscribe(
      x => {
        alert("Region successfully edited!");
        window.location.reload();
      },
      err => {
        // alert(x.json().Message));
        alert("Region can't be edited!");
      });
  }
}
