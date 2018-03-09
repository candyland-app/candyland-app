import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class AddUserService {
    constructor(private http: Http) {}

    sendUser(user: User) {
        const url = 'http://localhost:8181/user/add';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, JSON.stringify(user), { headers });
    }
}
