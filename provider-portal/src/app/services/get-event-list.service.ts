import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class GetEventListService {
    constructor(private http: Http) {}

    getEventList() {
        const url = 'http://localhost:8181/event/eventList';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers });
    }
}
