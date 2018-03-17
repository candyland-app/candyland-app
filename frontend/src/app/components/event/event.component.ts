import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../models/events';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    private event: Events = new Events();
    private eventsList: Events[] = [];
    private eventId: number;

    ngOnInit() {
        this.event.id = 1;
        this.event.name = 'Bird Watching';
        this.event.address = 'Karamanli Street 33, Pagkrati';
        this.event.category = 'Sports';
        this.eventsList.push(this.event);

        this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    }

    createStaticEventList() {}
}
