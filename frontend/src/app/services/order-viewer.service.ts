import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app-const';

@Injectable()
export class OrderViewerService {

	constructor(private http: Http) { }

	addItem(id: number, quantity: number) {
		let url = AppConst.serverPath + "/order-viewer/add";
		let orderItemInfo = {
			"eventId": id,
			"quantity": quantity
		}
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, orderItemInfo, { headers: tokenHeader });
	}

	getOrderViewerItemList() {
		let url = AppConst.serverPath + "/order-viewer/getOrderViewerItemList";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.get(url, { headers: tokenHeader });
	}

	getOrderViewer() {
		let url = AppConst.serverPath + "/order-viewer/getOrderViewer";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.get(url, { headers: tokenHeader });
	}

	updateOrderViewerItem(orderItemId: number, quantity: number) {
		let url = AppConst.serverPath + "/order-viewer/updateOrderViewerItem";
		let orderItemInfo = {
			"orderItemId": orderItemId,
			"quantity": quantity
		}
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, orderItemInfo, { headers: tokenHeader });
	}

	removeOrderViewerItem(id: number) {
		let url = AppConst.serverPath + "/order-viewer/removeItem";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, id, { headers: tokenHeader });
	}

}
