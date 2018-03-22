import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { GetEventListService } from '../../services/get-event-list.service';
import { LoginService } from '../../services/login.service';
import { RemoveEventService } from '../../services/remove-event.service';


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    private selectedEvent: Event;
    private checked: boolean;
    private eventList: Event[];
    private allChecked: boolean;
    private removeEventList: Event[] = new Array();

    constructor(
        private getEventListService: GetEventListService,
        private removeEventService: RemoveEventService,
        private router: Router,
    ) {}

    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/viewEvent', this.selectedEvent.id]);
    }

    updateRemoveEventList(checked: boolean, event: Event) {
        if (checked) {
            this.removeEventList.push(event);
        } else {
            this.removeEventList.splice(this.removeEventList.indexOf(event), 1);
        }
    }

    updateSelected(checked: boolean) {
        if (checked) {
            this.allChecked = true;
            this.removeEventList = this.eventList;
        } else {
            this.allChecked = false;
            this.removeEventList = [];
        }
    }

    getEventList() {
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

    ngOnInit() {
        this.getEventList();
    }
}

