import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class EditUserService {

	constructor(private http: Http) { }

	sendUser(user: User) {
		let url = "http://localhost:8181/user/update";

		let headers = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem('xAuthToken')
		});

		return this.http.post(url, JSON.stringify(user), { headers: headers });
	}
}
