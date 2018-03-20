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
    public description = '';
    public rowsOnPage = 5;

    private selectedEvent: Event;
    private eventList: Event[];
    public event = new Event;
    private serverPath = AppConst.serverPath;

    private selectedDate: Date;
    private selectedAddress;
    private selectedZipcode;
    private selectedAge;
    private selectedPrice;
    private selectedCategory;
    private selectedMinPrice;
    private selectedMaxPrice;


     public prices: Array<Object> = [
         { name: "1-10€" },
         { name: "11-20€" },
         { name: "21-40€" },
         { name: "41+€" }
    ];
    public categories: Array<Object> = [
        { name: "Any Category" },
        { name: "Sports" },
        { name: "Music" },
        { name: "Education" },
        { name: "Cinema" }
    ];
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
    onSearch() {

    }

    ngOnInit() {

        this.selectedCategory = 'Any Category';
        //this.selectedAge = 0;
        //this.selectedMaxPrice = 0;
        this.route.queryParams.subscribe(params => {
            if (params['eventList']) {
                console.log('filtered event list');
                this.eventList = JSON.parse(params['eventList']);
                this.event = new Event;
                this.event.description = '';
            } else {
                this.eventService.getEventList().subscribe(
                    res => {
                        console.log(res.json());
                        this.eventList = res.json();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });

    }
}
