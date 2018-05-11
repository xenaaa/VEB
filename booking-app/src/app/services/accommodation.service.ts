import { Injectable } from '@angular/core';
import { Accommodation } from '../models/accommodation';
import { Place } from '../models/place';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';


@Injectable()
export class AccommodationService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) {

    }

    getAll(): Observable<any> {
        
        return this.http.get(this.apiUrl+`api/Accommodations`);
    }

    getAccommodations(id: number): Observable<any> {
        
        return this.http.get(this.apiUrl+`api/Accommodation/` + id);
    }

    getAccommodation(id: number): Observable<any> {
        
        return this.http.get(this.apiUrl+`api/Accommodations/` + id);
    }


    getOwnerId(id: number): Promise<Accommodation> {
        return this.http.get(this.apiUrl+`api/Accommodations/` + id).toPromise().then(response => response.json() as Accommodation);
    }


    addAccommodation(accommodation: Accommodation, file: File): Observable<any> {
        accommodation.Place = null;
        accommodation.Rooms = null;
        accommodation.AccommodationType = null;
        let formData: FormData = new FormData();
        debugger
        formData.append('accommodation', JSON.stringify(accommodation));
        formData.append('uploadFile', file, file.name);
 
        debugger
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');


        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.apiUrl+`api/Accomodations`, formData, opts);
    }


    deleteAccommodation(id: number): Observable<any> {
        debugger
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl+`api/Accommodations/` + id, opts);
    }

    editAccommodation(accommodation: Accommodation): Observable<any> {
        debugger
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl+`api/Accommodations/` + accommodation.Id, accommodation, opts);
    }



    getFilterAccommodations(name: string, placeName: string, regionName: string, countryName: string,
        minGrade: number, maxGrade: number, bedCount: number, minPrice: number, maxPrice: number,
        pageNumber: number, pageSize: number): Observable<any> {
        debugger

        let skip = (pageNumber - 1) * pageSize;
        let filter = "";

        if (name != undefined && name != "") {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Name eq '" + name + "'";
        }

        if (placeName != undefined && placeName != "") {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Place/Name eq '" + placeName + "'";
        }

        if (regionName != undefined && regionName != "") {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Place/Region/Name eq '" + regionName + "'";
        }

        if (countryName != undefined && countryName != "") {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Place/Region/Country/Name eq '" + countryName + "'";
        }


        if (minGrade != undefined && minGrade != -1) {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "AverageGrade ge " + minGrade--;
        }

        if (maxGrade != undefined && maxGrade != -1) {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "AverageGrade le " + maxGrade++;
        }


        if (bedCount != undefined && bedCount != -1) {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Rooms/any(c: c/BedCount eq " + bedCount + ")";
        }

        if (minPrice != undefined && minPrice != -1) {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Rooms/any(c: c/PricePerNight ge " + minPrice-- + ")";
        }

        if (maxPrice != undefined && maxPrice != -1) {
            if (filter != "") {
                filter = filter + " and ";
            }
            filter = filter + "Rooms/any(c: c/PricePerNight le " + maxPrice++ + ")";
        }

        filter = filter + " and Approved eq true"; 

        let urlAddress =this.apiUrl+`odata/Accommodations?$top=${pageSize}&$skip=${skip} &$filter=${filter}  &$inlinecount=allpages`
        debugger
        return this.http.get(urlAddress);
    }
}
