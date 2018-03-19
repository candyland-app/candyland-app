import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { BillingAddress } from '../models/billing-address';
import { Payment } from '../models/payment';

@Injectable()
export class CheckoutService {
    constructor(private http: Http) {}

    checkout(billingAddress: BillingAddress, payment: Payment) {
        const url = AppConst.serverPath + '/checkout/checkout';
        const order = {
            billingAddress,
            payment
        };
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, order, { headers: tokenHeader });
    }

    getUserOrder() {
        const url = AppConst.serverPath + '/checkout/getUserOrder';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers: tokenHeader });
    }
}
