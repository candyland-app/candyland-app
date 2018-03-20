import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { AddEventService } from '../../services/add-event.service';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
    selector: 'app-add-new-event',
    templateUrl: './add-new-event.component.html',
    styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent implements OnInit {
    private newEvent: Event = new Event();
    private eventAdded: boolean;

    constructor(
        private addEventService: AddEventService,
        private uploadImageService: UploadImageService
    ) {}

    onSubmit() {
        this.addEventService.sendEvent(this.newEvent).subscribe(
            res => {
                this.uploadImageService.upload(
                    JSON.parse(JSON.parse(JSON.stringify(res))._body).id
                );
                this.eventAdded = true;
                this.newEvent = new Event();
                this.newEvent.active = true;
                this.newEvent.minAge = 1;
                this.newEvent.maxAge = this.newEvent.minAge + 1;
                this.newEvent.availableTickets = 1;
                this.newEvent.price = 0.01;
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        this.eventAdded = false;
        this.newEvent.active = true;
        this.newEvent.minAge = 1;
        this.newEvent.maxAge = this.newEvent.minAge + 1;
        this.newEvent.availableTickets = 1;
        this.newEvent.price = 0.01;
        this.newEvent.address = '';
        this.newEvent.category = 'Any Category';
        this.newEvent.description = '';
        this.newEvent.endTime = '';
        this.newEvent.startTime = '';
        this.newEvent.endDate = '';
        this.newEvent.startDate = '';
        this.newEvent.zipcode = '';
        this.newEvent.name = '';
    }
}
