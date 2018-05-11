import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { Appuser } from '../models/appuser';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: Http) { }

  getAll(): Observable<any> {

    return this.http.get(this.apiUrl + `api/Users`);
  }


  getUser(id: number): Promise<Appuser> {

    //  return this.http.get(this.apiUrl + `Users/`+id);
    return this.http.get(this.apiUrl + `api/Users/` + id).toPromise().then(response => response.json() as Appuser);
    //  subject;
  }

  getById(id: number) : Observable<any>
  {
    
    return this.http.get(this.apiUrl + `api/Users/` + id).
                             map((response: Response)=>response.json());
  }
  isBanned(id: number) {
    this.getUser(id);
  }

  editUser(user: User): Observable<any> {
    const headers: Headers = new Headers();

    if (localStorage.getItem("token") !== null) {
      headers.append("Authorization", localStorage.getItem("token"));
    }
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.put(this.apiUrl + `api/Users/` + user.AppUserId, user.AppUser, opts);
  }
}