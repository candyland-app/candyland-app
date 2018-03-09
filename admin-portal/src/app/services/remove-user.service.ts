import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import {AppConstants} from '../constants/app-constants'

@Injectable()
export class RemoveUserService {

	private serverPath:string = AppConstants.serverPath;

	constructor(private http: Http) { }
    
    sendUser(userId: number) {
        const url = this.serverPath + '/user/remove';

        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, userId, { headers });
    }
}
