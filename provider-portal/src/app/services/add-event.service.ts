import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Event } from '../models/event';

@Injectable()
export class AddEventService {
    constructor(private http: Http) {}

    sendEvent(event: Event) {
        const url = 'http://localhost:8181/event/add';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, JSON.stringify(event), { headers });
    }
}
