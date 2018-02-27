import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../models/user';

@Injectable()
export class RemoveUserService {

  constructor(private http:Http) { }

  sendUser(userId: number) {
  	let url = "http://localhost:8181/user/remove";

    let headers = new Headers ({
      'Content-Type': 'application/json',
      'x-auth-token' : localStorage.getItem('xAuthToken')
    });

    return this.http.post(url, userId, {headers: headers});
  }

}
