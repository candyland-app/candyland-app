import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AppConst } from '../constants/app-const';

@Injectable()
export class EventService {
    private serverPath: string = AppConst.serverPath;

    constructor(private http: Http) {}

    getEventList() {
        const url = this.serverPath + '/event/eventList';
        const tokenHeader = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers: tokenHeader });
    }

    getEvent(id: number) {
        const url = this.serverPath + '/event/' + id;
        const tokenHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers: tokenHeaders });
    }

    searchEvent(keyword: string) {
        const url = this.serverPath + '/event/searchEvent';
        const tokenHeaders = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, keyword, { headers: tokenHeaders });
    }
}
