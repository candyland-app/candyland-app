import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { log } from 'util';
import { AppConst } from '../../constants/app-const';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    public filterQuery = '';
    public rowsOnPage = 5;

    private selectedEvent: Event;
    private eventList: Event[];
    private serverPath = AppConst.serverPath;

    constructor(
        private eventService: EventService,
        private router: Router,
        private http: Http,
        private route: ActivatedRoute
    ) {}

    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/eventDetail', this.selectedEvent.id]);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['eventList']) {
                console.log('filtered event list');
                this.eventList = JSON.parse(params['eventList']);
            } else {
                this.eventService.getEventList().subscribe(
                    res => {
                        console.log(res.json());
                        this.eventList = res.json();
                        console.log('PUUUUSSSSYMAAAAAN\n\n');
                        console.log(this.eventList);
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    }
}
