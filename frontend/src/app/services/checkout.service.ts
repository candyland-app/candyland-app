import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { BillingAddress } from '../models/billing-address';
import { Payment } from '../models/payment';


@Injectable()
export class CheckoutService {

	constructor(private http: Http) { }

	checkout(
		payment: Payment,
		billingAddress: BillingAddress
	) {
		let url = AppConst.serverPath + "/checkout/checkout";
		let order = {
			"payment": payment,
			"billingAddress": billingAddress
		}
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.post(url, order, { headers: tokenHeader });
	}

	getUserOrder() {
		let url = AppConst.serverPath + "/checkout/getUserOrder";
		let tokenHeader = new Headers({
			'Content-Type': 'application/json',
			'x-auth-token': localStorage.getItem("xAuthToken")
		});
		return this.http.get(url, { headers: tokenHeader });
	}
}
