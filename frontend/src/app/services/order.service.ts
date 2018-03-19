import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { Order } from '../models/order';

@Injectable()
export class OrderService {
    constructor(private http: Http) {}

    getOrderList() {
        const url = AppConst.serverPath + '/order/getOrderList';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers: tokenHeader });
    }
}
