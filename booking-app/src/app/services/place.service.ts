import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Place } from '../models/place';
import { environment } from '../../environments/environment';

@Injectable()
export class PlaceService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + `api/Places`);
    }

    getPlaces(id: number): Observable<any> {
        return this.http.get(this.apiUrl + `api/Places/` + id);
    }

    addPlace(place: Place): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.apiUrl + `api/Places`, place, opts);
    }

    deletePlace(id: number): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl + `api/Places/` + id, opts);
    }

    editPlace(place: Place): Observable<any> {

        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl + `api/Places/` + place.Id, place, opts);
    }

}
