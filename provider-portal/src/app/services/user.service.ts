import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConst } from '../constants/app-const';
import { User } from '../models/user';

@Injectable()
export class UserService {
    private serverPath: string = AppConst.serverPath;

    constructor(private http: Http) {}

    newUser(username: string, email: string) {
        const url = this.serverPath + '/user/newUser';
        const userInfo = {
            username,
            email
        };
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, JSON.stringify(userInfo), {
            headers: tokenHeader
        });
    }

    updateUserInfo(user: User, newPass: string, currentPass: string) {
        const url = this.serverPath + '/user/updateUserInfo';
        const userInfo = {
            id: user.id,
            walletPoints: user.walletPoints,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            currentPassword: currentPass,
            email: user.email,
            newPassword: newPass
        };

        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.post(url, JSON.stringify(userInfo), {
            headers: tokenHeader
        });
    }

    retrievePassword(email: string) {
        const url = this.serverPath + '/user/forgetPassword';
        const userInfo = {
            email
        };
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        return this.http.post(url, JSON.stringify(userInfo), {
            headers: tokenHeader
        });
    }

    getCurrentUser() {
        console.log("In getcurrentuser()");
        const url = this.serverPath + '/user/getCurrentUser';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });
        console.log(this.http.get(url, { headers: tokenHeader }));
        console.log("ending");
        return this.http.get(url, { headers: tokenHeader });
    }
}
