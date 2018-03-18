import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConst } from '../constants/app-const';

@Injectable()
export class CartService {
    constructor(private http: Http) {}

    addItem(id: number, qty: number) {
        const url = AppConst.serverPath + '/cart/add';
        const cartItemInfo = {
            eventId: id,
            qty
        };
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.post(url, cartItemInfo, { headers: tokenHeader });
    }

    getCartItem() {
        const url = AppConst.serverPath + '/cart/getCartItemList';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.get(url, {
            headers: tokenHeader
        });
    }

    getCartItemList() {
        const url = AppConst.serverPath + '/cart/getCartItemList';

        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.get(url, { headers: tokenHeader });
    }

    getShoppingCart() {
        const url = AppConst.serverPath + '/cart/getShoppingCart';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.get(url, { headers: tokenHeader });
    }

    updateCartItem(cartItemId: number, qty: number) {
        const url = AppConst.serverPath + '/cart/updateCartItem';
        const cartItemInfo = { cartItemId, qty };
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.post(url, cartItemInfo, {
            headers: tokenHeader
        });
    }

    removeCartItem(id: number) {
        const url = AppConst.serverPath + '/cart/removeItem';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.post(url, id, {
            headers: tokenHeader
        });
    }
}
