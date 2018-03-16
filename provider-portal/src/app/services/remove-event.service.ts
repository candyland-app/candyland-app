import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Event } from '../models/event';

@Injectable()
export class RemoveEventService {
    constructor(private http: Http) {}

    sendEvent(eventId: number) {
        const url = 'http://localhost:8181/event/remove';
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.post(url, eventId, { headers });
    }
}
