import { Component, OnInit } from '@angular/core';
import { Events } from '../../models/events';

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
    constructor() {}

    private event: Events = new Events();
    private eventsList: Events[] = [];

    ngOnInit() {
        this.event.id = 1;
        this.event.name = 'Bird Watching';
        this.event.address = 'Karamanli Street 33, Pagkrati';
        this.event.category = 'Sports';
        this.eventsList.push(this.event);
        this.event = new Events();
        this.event.id = 2;
        this.event.name = 'Nemo Movie';
        this.event.address = 'Kolokotroni Street 12, Psychiko';
        this.event.category = 'Cinema';
        this.eventsList.push(this.event);
        this.event = new Events();
        this.event.id = 3;
        this.event.name = 'Tom o Bagasas';
        this.event.address = '25is Martiou 323, Nea Smyrni';
        this.event.category = 'Theatre';
        this.eventsList.push(this.event);
    }

    createStaticEventList() {
        // this.eventList[0].name = 'Aloha';
    }
}
