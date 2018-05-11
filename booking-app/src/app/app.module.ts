import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryService } from './services/country.service'
import { RegionService } from './services/region.service';
import { PlaceService } from './services/place.service';
import { LoginService } from './services/login.service';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './services/registration.service';
import { RegionListComponent } from './region-list/region-list.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import { AccommodationTypeListComponent } from './accommodation-type-list/accommodation-type-list.component';
import { AccommodationService } from './services/accommodation.service';
import { AccommodationTypeService } from './services/accommodation-type.service';
import { RoomListComponent } from './room-list/room-list.component';
import { MapComponent } from './map/map.component';
import { RoomReservationComponent } from './room-reservation/room-reservation.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationService } from './services/notification.service';

const Routes = [
 // {path: "", component: CountryListComponent},
  {path: "countrylist", component: CountryListComponent},
  {path: "register", component: RegistrationComponent},
  {path: "regionlist/:id/:name", component: RegionListComponent},
  {path: "placelist/:id/:name/:cid/:cname", component: PlaceListComponent},
  {path: "accommodationlist", component: AccommodationListComponent},
  {path: "accommodationtypelist", component: AccommodationTypeListComponent},
  {path: "roomlist/:id/:name", component: RoomListComponent},
  {path: "roomreservations", component: RoomReservationComponent},
  {path: "accommodation/:id", component: AccommodationComponent},
  {path: "managerlist", component: ManagerListComponent},
  {path: "accommodationlist/:id", component: AccommodationListComponent},
]
  
@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    LoginComponent,
    RegistrationComponent,
    RegionListComponent,
    PlaceListComponent,
    AccommodationListComponent,
    AccommodationTypeListComponent,
    RoomListComponent,
    MapComponent,
    RoomReservationComponent,
    AccommodationComponent,
    ManagerListComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
	 FormsModule,
    HttpModule,
    JsonpModule,
     RouterModule.forRoot(Routes),
      //prilikom import-a mape prosleđujemo Google API key koji dobijamo preko google konzole
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBfCrrtQTPiIy5zch2d8WYUsbIrtv1IHlU'})
    
  ],
  providers: [CountryService, RegionService, PlaceService, LoginService, RegistrationService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
