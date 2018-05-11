import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginUser } from '../models/login-user';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth-user';

import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
    apiUrl = environment.apiUrl;

    loggedIn: boolean;
    isConnected: Boolean;
    responses: Observable<Response>;
    constructor(private http: Http, private router: Router) {
        this.isConnected = false;
    }

    logIn(user: LoginUser) {
        debugger
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/x-www-form-urlencoded');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        const params: string = `username=${user.username}&password=${user.password}&grant_type=password`;

        this.http.post(this.apiUrl + `oauth/token`, params, opts).subscribe(
            (data) => {
                if (data.status == 200) {
                    debugger

                    let role = data.headers.get('role');
                    let userId = data.headers.get('UserId');
                    let obj = data.json();
                    const token = obj['token_type'] + ' ' + obj['access_token'];
                    localStorage.setItem("token", token);
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("userId", userId);
                    localStorage.setItem("role", role);
                    this.router.navigate(['/accommodationlist']);
                } else {
                    alert("Oops, something went wrong. Try again.");
                }
            },
            err => {
                alert("Wrong username and password");
            });

    }

    logOut(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        this.router.navigate(['/accommodationlist']);

    }

    isLoggedIn(): boolean {

        if (localStorage.getItem("token") !== null)
            return true;
        else
            return false;
    }

    isAdmin(): boolean {

        let role = localStorage.getItem("role");
        if (role == "Admin")
            return true;
        else
            return false;
    }

    isManager(): boolean {

        let role = localStorage.getItem("role");
        if (role == "Manager")
            return true;
        else
            return false;
    }

    getUserId(): number {

        let userId = localStorage.getItem("userId");
        let Id = +userId;
        return Id;
    }

    getRole(): string {

        let role = localStorage.getItem("role");
        return role;
    }
}