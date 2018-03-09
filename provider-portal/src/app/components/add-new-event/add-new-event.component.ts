import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';

@Component({
    selector: 'app-add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {
    private newEvent: Event = new Event();
    private;

    constructor() {}

    ngOnInit() {}
}
