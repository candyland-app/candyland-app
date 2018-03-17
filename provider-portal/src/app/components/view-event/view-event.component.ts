import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../../models/event';
import { GetEventService } from '../../services/get-event.service';

@Component({
    selector: 'app-view-event',
    templateUrl: './view-event.component.html',
    styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {
    private event: Event = new Event();
    private eventId: number;

    constructor(
        private getEventService: GetEventService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    onSelect(event: Event) {
        this.router.navigate(['/editEvent', this.event.id]).then(res => {
            location.reload();
        });
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
