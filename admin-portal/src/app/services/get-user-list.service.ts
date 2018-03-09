import { Injectable } from '@angular/core';
import {AppConstants} from '../constants/app-constants'
import { Headers, Http } from '@angular/http';

@Injectable()
export class GetUserListService {

	private serverPath:string = AppConstants.serverPath;

	constructor(private http: Http) { }

    getUserList() {
        const url = this.serverPath + '/user/userList';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers });
    }
}
