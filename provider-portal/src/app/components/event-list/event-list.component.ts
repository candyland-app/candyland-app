import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { GetEventListService } from '../../services/get-event-list.service';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    private selectedEvent: Event;
    private checked: boolean;
    private eventList: Event[];
    private allChecked: boolean;
    private removeEventList: Event[] = new Array();

    constructor(
        private getEventListService: GetEventListService,
        private router: Router
    ) {}

    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/viewEvent', this.selectedEvent.id]);
    }

    ngOnInit() {
        this.getEventListService.getEventList().subscribe(
            res => {
                console.log(res.json());
                this.eventList = res.json();
            },
            error => {
                console.log(error);
            }
        );
    }
}
