import { Injectable } from '@angular/core';
import { Country } from '../models/country';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class CountryService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) {

    }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + `api/Countries`);
    }

    addCountry(country: Country): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.apiUrl + `api/Countries`, country, opts);
    }

    deleteCountry(id: number): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl + `api/Countries/` + id, opts);
    }

    editCountry(country: Country): Observable<any> {
        const headers: Headers = new Headers();

        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl + `api/Countries/` + country.Id, country, opts);
    }
}
