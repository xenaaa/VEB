import { Injectable } from '@angular/core';
import { RoomReservation } from '../models/room-reservation';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';

@Injectable()
export class RoomReservationService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http) { }

    getRoomReservations(id: number): Observable<any> {
        debugger
        return this.http.get(this.apiUrl + `api/RoomReservations/` + id);
    }

    addRoomReservation(roomReservation: RoomReservation): Observable<any> {
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.post(this.apiUrl + `api/RoomReservations`, roomReservation, opts);
    }

    deleteRoomReservation(id: number): Observable<any> {
        debugger
        const headers: Headers = new Headers();
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(this.apiUrl + `api/RoomReservations/` + id, opts);
    }

    putRoomResrvation(roomReservation: RoomReservation): Observable<any> {
        const headers: Headers = new Headers();
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.apiUrl + `api/RoomReservations/` + roomReservation.Id, roomReservation, opts);
    }

}
