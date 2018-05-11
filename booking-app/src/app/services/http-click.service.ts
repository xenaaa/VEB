import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class HttpClickService {
  apiUrl = environment.apiUrl;

  constructor(private http: Http) {

  }


  notify(role: string): Observable<any> {
    const headers: Headers = new Headers();
    headers.append("Accept", "text/plain");
    if (localStorage.getItem("token") !== null) {
      headers.append("Authorization", localStorage.getItem("token"));
    }
    headers.append('Content-type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    //return this.http.post("http://localhost:54042/api/Notification/" + role, "", opts);
    return this.http.put(this.apiUrl + `api/Notification/` + role, "", opts);

  }
}