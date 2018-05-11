import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';


@Injectable()
export class RegistrationService {
  apiUrl = environment.apiUrl;

  constructor(private http: Http) {

  }

  register(registerUser: RegisterUser): Observable<any> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');

    let options = new RequestOptions();
    options.headers = header;
    return this.http.post(this.apiUrl + `api/Account/Register`, registerUser, options);
  }
}
