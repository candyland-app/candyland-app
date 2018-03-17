import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../../models/event';
import { EditEventService } from '../../services/edit-event.service';
import { GetEventService } from '../../services/get-event.service';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
    private eventId: number;
    private event: Event = new Event();
    private eventUpdated: boolean;

    constructor(
        private uploadImageService: UploadImageService,
        private editEventService: EditEventService,
        private getEventService: GetEventService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSubmit() {
        this.editEventService.sendEvent(this.event).subscribe(
            data => {
                this.uploadImageService.modify(
                    JSON.parse(JSON.parse(JSON.stringify(data))._body).id
                );
                this.eventUpdated = true;
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.eventId = Number.parseInt(params['id']);
        });

        this.getEventService.getEvent(this.eventId).subscribe(
            res => {
                this.event = res.json();
            },
            error => {
                console.log(error);
            }
        );
    }
}
