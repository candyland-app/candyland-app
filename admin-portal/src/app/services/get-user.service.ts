import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {AppConstants} from '../constants/app-constants'


@Injectable()
export class GetUserService {

	private serverPath:string = AppConstants.serverPath;

	constructor(private http: Http) { }

	getUser(id: number) {
		let url = this.serverPath + "/user/" + id;
		let headers = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem('xAuthToken')
		});

		return this.http.get(url, { headers: headers });
	}
}
