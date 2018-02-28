import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app-const';

@Injectable()
export class EventService {

	constructor(private http: Http) { }

	getEventList() {
		let url = AppConst.serverPath + "/event/eventList";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.get(url, { headers: tokenHeader });
	}

	getEvent(id: number) {
		let url = AppConst.serverPath + "/event/" + id;
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.get(url, { headers: tokenHeader });
	}

	searchEvent(keyword: string) {
		let url = AppConst.serverPath + "/event/searchEvent";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, keyword, { headers: tokenHeader });
	}
}
