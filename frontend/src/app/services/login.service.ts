import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppConst } from '../constants/app-const';

@Injectable()
export class LoginService {
    private serverPath: string = AppConst.serverPath;

    constructor(private http: Http, private router: Router) {}

    sendCredential(username: string, password: string) {
        const url = this.serverPath + '/token';
        const encodedCredentials = btoa(username + ':' + password);
        const basicHeader = 'Basic ' + encodedCredentials;
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: basicHeader
        });

        return this.http.get(url, { headers });
    }

    checkSession() {
        const url = this.serverPath + '/checkSession';
        const headers = new Headers({
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers });
    }

    logout() {
        const url = this.serverPath + '/user/logout';
        const headers = new Headers({
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, '', { headers });
    }
}
