import { Injectable } from '@angular/core';
import {AppConstants} from '../constants/app-constants'
import { Headers, Http } from '@angular/http';

@Injectable()
export class GetUserService {
    constructor(private http: Http) {}

	private serverPath:string = AppConstants.serverPath;

	constructor(private http: Http) { }

    getUser(id: number) {
        const url = this.serverPath + '8181/user/' + id;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers });
    }
}
