import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
@Injectable()
export class CommentService {

    apiUrl = environment.apiUrl;

    constructor(private http: Http) { }

    getComments(id: number): Observable<any> {
        return this.http.get(this.apiUrl + `api/Comments/` + id);
    }

    addComment(comment: Comment): Observable<any> {
        {
            const headers: Headers = new Headers();
            debugger
            if (localStorage.getItem("token") !== null) {
                headers.append("Authorization", localStorage.getItem("token"));
            }
            headers.append('Accept', 'application/json');
            headers.append('Content-type', 'application/json');

            const opts: RequestOptions = new RequestOptions();
            opts.headers = headers;
            return this.http.post(this.apiUrl + `api/Comments`, comment, opts);
        }
    }

    deleteComment(id1: number, id2: number): Observable<any> {
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.delete(this.apiUrl + `api/Comments/` + id1 + `/` + id2, opts);
    }

    editComment(comment: Comment, id1: number, id2: number): Observable<any> {
        const headers: Headers = new Headers();
        debugger
        if (localStorage.getItem("token") !== null) {
            headers.append("Authorization", localStorage.getItem("token"));
        }
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        return this.http.put(this.apiUrl + `api/Comments/` + comment.Id + `/` + id1 + `/` + id2, comment, opts);
    }

}