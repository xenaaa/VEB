import { Injectable } from '@angular/core';
import { AccommodationType } from '../models/accommodation-type';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class AccommodationTypeService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) { }

    getAll(): Observable<any> {
     //   return this.http.get(this.apiUrl+`AccommodationTypes`);
    return this.http.get(this.apiUrl+`api/AccommodationTypes`);

    }

    addAccommodationType(accommodationType: AccommodationType): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.apiUrl+`api/AccommodationTypes`, accommodationType, opts);
    }

    deleteAccommodationType(id: number): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl+`api/AccommodationTypes/` + id, opts);
    }

    editAccommodationType(accommodationType: AccommodationType): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl+`api/AccommodationTypes/` + accommodationType.Id, accommodationType, opts);
    }
}