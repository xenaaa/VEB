import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RoomService {
    apiUrl = environment.apiUrl;

  constructor(private http: Http)  {   }

  getRooms(id: number):Observable<any>{
      debugger
      return this.http.get(this.apiUrl + `api/Rooms/`+id);
  }
  
  getRoom(id: number):Observable<any>{
    debugger
    return this.http.get(this.apiUrl + `api/Room/`+id);
}

addRoom(room: Room): Observable<any> 
{
  const headers: Headers = new Headers();
      debugger
      if(localStorage.getItem("token") !== null)
      {
          headers.append("Authorization", localStorage.getItem("token"));
      }
      headers.append('Accept', 'application/json');
      headers.append('Content-type', 'application/json');

      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
  return this.http.post(this.apiUrl + `api/Rooms`, room, opts);
  }

  deleteRoom(id: number):Observable<any>{
    const headers: Headers = new Headers();
    debugger
    if(localStorage.getItem("token") !== null)
    {
        headers.append("Authorization", localStorage.getItem("token"));
    }
    headers.append('Accept', 'application/json');
    headers.append('Content-type', 'application/json');

    const opts: RequestOptions = new RequestOptions();
    opts.headers = headers;
    return this.http.delete(this.apiUrl + `api/Rooms/`+id, opts);
    }
  
    editRoom(room: Room):Observable<any>{
      debugger
      const headers: Headers = new Headers();
      debugger
      if(localStorage.getItem("token") !== null)
      {
          headers.append("Authorization", localStorage.getItem("token"));
      }
      headers.append('Accept', 'application/json');
      headers.append('Content-type', 'application/json');
      
      const opts: RequestOptions = new RequestOptions();
      opts.headers = headers;
      return this.http.put(this.apiUrl + `api/Rooms/`+room.Id, room, opts);
  }
}