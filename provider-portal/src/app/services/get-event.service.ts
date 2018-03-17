import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class GetEventService {
    constructor(private http: Http) {}

    getEvent(id: number) {
        const url = 'http://localhost:8181/event/' + id;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('xAuthToken')
        });

        return this.http.get(url, { headers });
    }
}
