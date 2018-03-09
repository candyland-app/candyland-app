import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import {AppConstants} from '../constants/app-constants'


@Injectable()
export class EditUserService {
    
    private serverPath:string = AppConstants.serverPath;

	constructor(private http: Http) { }

	sendUser(user: User) {
	    const url = this.serverPath + "/user/update";

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, JSON.stringify(user), { headers });
    }
}
