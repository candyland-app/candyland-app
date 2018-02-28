import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class GetUserService {

	constructor(private http: Http) { }

	getUser(id: number) {
		let url = "http://localhost:8181/user/" + id;
		let headers = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem('xAuthToken')
		});

		return this.http.get(url, { headers: headers });
	}
}
