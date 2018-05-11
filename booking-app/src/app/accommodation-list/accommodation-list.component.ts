import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Accommodation } from '../models/accommodation';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationTypeService } from '../services/accommodation-type.service';
import { User } from '../models/user';
import { Place } from '../models/place';
import { Country } from '../models/country';
import { Region } from '../models/region';
import { Appuser } from '../models/appuser';


import { AccommodationType } from '../models/accommodation-type';
import { CountryService } from '../services/country.service';
import { PlaceService } from '../services/place.service';
import { RegionService } from '../services/region.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { PagingService } from '../services/paging.service';
import { NotificationService } from '../services/notification.service';
import { HttpClickService } from '../services/http-click.service';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
  styles: ['agm-map {height: 400px; width: 1100px;}'],

  providers: [HttpClickService, NotificationService, PagingService, UserService, AccommodationService, AccommodationTypeService, CountryService, PlaceService, RegionService, LoginService]
})
export class AccommodationListComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];
  time: string;

  file: File;

  Id: number;
  Name: string;
  Description: string;
  Address: string;
  ImageUrl: File;
  Approved: boolean;
  PlaceId: number;
  AccomodationTypeId: number;
  UserId: number;
  Place: Place;
  AccommodationType: AccommodationType;
  accommodation: Accommodation;

  Region: Region;
  RegionId: number;
  Country: Country;
  CountryId: number;


  accommodationTypes: AccommodationType[];
  places: Place[];
  countries: Country[];
  regions: Region[];
  accommodations: Accommodation[];
  url: string = "http://localhost:54042/";

  appuser: Appuser;

  acc: Accommodation;


  AccName: string;
  PlaceName: string;
  RegionName: string;
  CountryName: string;
  BedCount: number;
  MinPrice: number;
  MaxPrice: number;
  MinGrade: number;
  MaxGrade: number;

  approvedAccommodations: Accommodation[];

  Accommodations: Accommodation[];

  counter: Array<number>;
  CurrentPage: number = 1;
  selectedButton: number = 1;

  banned: boolean;
  clickedLat: number;
  clickedLong: number;
  accManId: number
  lat: number = 45.242268;
  lng: number = 19.842954;

  users: User[];

  constructor(private accommodationService: AccommodationService,
    private accommodationTypeService: AccommodationTypeService,
    private countryService: CountryService,
    private regionService: RegionService,
    private placeService: PlaceService,
    private loginService: LoginService,
    private userService: UserService,
    private pagingService: PagingService,
    private notificationService: NotificationService,
    private httpClickService: HttpClickService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClickService,
    private ngZone: NgZone) {

    activatedRoute.params.subscribe(params => { this.accManId = params["id"] });

    this.acc = new Accommodation();
    this.accommodations = []
    this.approvedAccommodations = []
    this.users = [];

    this.countries = [];
    this.regions = [];
    this.places = [];
    this.accommodationTypes = [];
    this.url = "http://localhost:54042/";
    this.UserId = loginService.getUserId();
    this.userService.getAll().subscribe(x => this.users = x.json());



    this.isConnected = false;
    this.notifications = [];
    this.CurrentPage = 1;

  }

  ngOnInit() {

    this.checkConnection();
    // this.subscribeForNotifications();
    //this.subscribeForTime();


    if (this.accManId != undefined) {
      debugger
      this.accommodationService.getAccommodations(this.accManId).subscribe(x => this.accommodations = x.json());
    }
    else {
      this.accommodationService.getAll().subscribe(x => this.accommodations = x.json());
    }

    this.countryService.getAll().subscribe(x => this.countries = x.json());
    this.regionService.getAll().subscribe(x => this.regions = x.json());
    this.placeService.getAll().subscribe(x => this.places = x.json());
    this.accommodationTypeService.getAll().subscribe(x => this.accommodationTypes = x.json());
    this.userService.getAll().subscribe(x => this.users = x.json());

    this.refresh();
  }

  onSubmit(form: NgForm) {
    let id = this.loginService.getUserId()

    /* this.accommodationService.addAccommodation(new Accommodation(0, this.Name,
       this.Description, this.Address, false,
       "", this.clickedLat, this.clickedLong, this.PlaceId, this.AccomodationTypeId, id), this.file).subscribe(x => {
         this.httpClickService.notify('Admin').subscribe(data => console.log(data));
       });
  */
    this.accommodationService.addAccommodation(new Accommodation(0, this.Name,
      this.Description, this.Address, false,
      "", this.clickedLat, this.clickedLong, this.PlaceId, this.AccomodationTypeId, id), this.file).subscribe(
        x => {
          alert("Accommodation successfully added!");
          window.location.reload();
        },
        err => {
          alert("Accommodation can't be added!");
        });

    //this.refresh();

  }



  refresh() {
    let list = this.accommodations;

    for (let entry of list) {
      entry.AccommodationType = this.getAccType(entry.AccommodationTypeId);
    }
    this.accommodationTypeService.getAll().subscribe(x => this.accommodationTypes = x.json());
    this.userService.getAll().subscribe(x => this.users = x.json());

    /*
        this.userService.getById(this.UserId).subscribe(
          data => {
            this.appuser = data;
          });*/

  }


  getAccType(id: number): AccommodationType {

    for (let accommodationType of this.accommodationTypes) {
      if (accommodationType.Id == id) {
        return accommodationType;
      }
    }
  }

  onCountryChange(selectedCountry) {

    if (selectedCountry == undefined || selectedCountry == "") {
      this.regions = [];
    } else {
      debugger
      this.regionService.getRegions(this.CountryId).subscribe(x => this.regions = x.json());
      this.places = [];
    }
  }

  onRegionChange(selectedRegion) {
    if (selectedRegion == undefined || selectedRegion == "") {
      this.places = [];
    } else {
      this.placeService.getPlaces(this.RegionId).subscribe(x => this.places = x.json());
    }
  }

  onChangeImage(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
  }

  
  isLoggedIn(): boolean {
    if (this.loginService.isLoggedIn()) {
      if (this.appuser == undefined) {
        this.UserId = this.loginService.getUserId();
        // this.userService.getUser(this.UserId).subscribe(x => this.appuser = x.json());
        this.userService.getUser(this.UserId).then(data => {
          this.appuser = data;
        });
      }
      debugger
      return true;
    }
    return false;
  }

  isManager(): boolean {

    return this.loginService.isManager();

  }

  isBanned(): boolean {
    this.users.forEach(element => {
      if (element.AppUser.id == this.UserId) {
        return element.AppUser.IsBanned;
      }
    });
    return false;
  }

  isAdmin(): boolean {
    return this.loginService.isAdmin();
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



  private checkConnection() {
    this.notificationService.connectionEstablished.subscribe(e => {
      this.isConnected = e;
      if (e) {
        this.notificationService.sendHello()
      }
    });
  }

  private subscribeForNotifications() {
    this.notificationService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {

    this.ngZone.run(() => {
      this.notifications.push(notif);
    });
  }

  subscribeForTime() {
    this.notificationService.timeReceived.subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: string) {
    this.ngZone.run(() => {
      this.time = time;
    });
  }

  public onClick() {
    if (this.isConnected) {
      this.http.notify("").subscribe(data => console.log(data));
    }
  }

  public startTimer() {
    this.notificationService.StartTimer();
  }

  public stopTimer() {
    this.notificationService.StopTimer();
    this.time = "";
  }




  onClickMap(res: any) {

    this.clickedLat = res.coords.lat;
    this.clickedLong = res.coords.lng;
  }

  onSubmitFilter(searchform: NgForm) {

    if (this.AccName == undefined || this.AccName == "") {
      this.AccName = "";
    }
    if (this.PlaceName == undefined || this.PlaceName == "") {
      this.PlaceName = "";
    }

    if (this.RegionName == undefined || this.RegionName == "") {
      this.RegionName = "";
    }

    if (this.CountryName == undefined || this.CountryName == "") {
      this.CountryName = "";
    }

    if (this.MinGrade == undefined) {
      this.MinGrade = -1;
    }

    if (this.MaxGrade == undefined) {
      this.MaxGrade = -1;
    }

    if (this.BedCount == undefined) {
      this.BedCount = -1;
    }

    if (this.MinPrice == undefined) {
      this.MinPrice = -1;
    }

    if (this.MaxPrice == undefined) {
      this.MaxPrice = -1;
    }

    this.accommodations = [];

    this.accommodationService.getFilterAccommodations(this.Name, this.PlaceName, this.RegionName,
      this.CountryName, this.MinGrade, this.MaxGrade, this.BedCount, this.MinPrice, this.MaxPrice,
      1, PagingService.PageSize).subscribe(x => {
        this.accommodations = (x.json()).value;
        this.pagingService.initPagingService(x);

        let counterLength = 2;
        if (this.CurrentPage * 2 > PagingService.PageNumber) {
          counterLength = PagingService.PageNumber - ((this.CurrentPage - 1) * 2);
        }
        debugger
        this.counter = new Array(counterLength);
        debugger
        this.refresh();
      });
  }


  changePage(pageNumber: number) {
    this.selectedButton = pageNumber;
    this.CurrentPage = pageNumber;
    debugger
    this.accommodationService.getFilterAccommodations(this.Name, this.PlaceName, this.RegionName,
      this.CountryName, this.MinGrade, this.MaxGrade, this.BedCount, this.MinPrice, this.MaxPrice,
      pageNumber, PagingService.PageSize).subscribe(x => {
        this.accommodations = (x.json()).value;
        this.refresh();
      });

    let counterLength = 2;
    debugger
    if (pageNumber == PagingService.PageNumber) {
      counterLength = 1;
    }

     this.counter = new Array(counterLength);
  }

  showNext(): boolean {
    return (this.CurrentPage + 1) <= PagingService.PageNumber;
  }

  showPrevious(): boolean {
    return this.CurrentPage > 1;
  }

  nextPage() {
    debugger
    this.CurrentPage = this.CurrentPage + 1;
    let counterLength = 2;
    if (this.CurrentPage == PagingService.PageNumber) {
      counterLength = 1;
    }


    this.counter = new Array(counterLength);

    this.changePage(this.CurrentPage);
  }

  previousPage() {
    this.CurrentPage = this.CurrentPage - 1;

    let counterLength = 2;
    this.counter = new Array(counterLength);

    this.changePage(this.CurrentPage);
  }

  removeFilter() {
    // this.refresh();
    //  window.location.reload();
    this.counter = [];
    this.CurrentPage = 1;
    this.selectedButton = 1;

    this.accommodationService.getAll().subscribe(x => this.accommodations = x.json());
    this.AccName = "";
    this.PlaceName = "";
    this.RegionName = "";
    this.CountryName = "";
    this.BedCount = undefined;
    this.MinPrice = undefined;
    this.MaxPrice = undefined;
    this.MinGrade = undefined;
    this.MaxGrade = undefined;
    this.CurrentPage = 1;
    this.pagingService.resetPageNumber();
    this.refresh();
  }

}
