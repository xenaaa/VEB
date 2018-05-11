import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Region } from '../models/region';

import { environment } from '../../environments/environment';

@Injectable()
export class RegionService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get(this.apiUrl + `api/Regions`);
    }


    getRegions(id: number): Observable<any> {
        debugger
        return this.http.get(this.apiUrl + `api/Regions/` + id);
    }

    addRegion(region: Region): Observable<any> {
        const headers: Headers = new Headers();
        
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.apiUrl + `api/Regions`, region, opts);

    }

    deleteRegion(id: number): Observable<any> {
        const headers: Headers = new Headers();
        
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl + `api/Regions/` + id, opts);
    }

    editRegion(region: Region): Observable<any> {
        
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl + `api/Regions/` + region.Id, region, opts);
    }
}
