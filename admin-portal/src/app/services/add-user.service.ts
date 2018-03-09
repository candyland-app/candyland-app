import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user';
import {AppConstants} from '../constants/app-constants'

@Injectable()
export class AddUserService {

	private serverPath:string = AppConstants.serverPath;
	constructor(private http: Http) { }

	sendUser(user: User) {
		let url = this.serverPath + "/user/add";

		let headers = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, JSON.stringify(user), { headers: headers });
	}

}
