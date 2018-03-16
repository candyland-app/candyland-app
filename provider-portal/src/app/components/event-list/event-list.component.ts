import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { GetEventListService } from '../../services/get-event-list.service';
import { LoginService } from '../../services/login.service';
import { RemoveEventService } from '../../services/remove-event.service';

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
        private removeEventService: RemoveEventService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/viewEvent', this.selectedEvent.id]);
    }

    openDialog(event: Event) {
        const dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result === 'yes') {
                this.removeEventService.sendEvent(event.id).subscribe(
                    res => {
                        console.log(res);
                        this.getEventList();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
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

    removeSelectedEvents() {
        const dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result === 'yes') {
                for (const event of this.removeEventList) {
                    this.removeEventService.sendEvent(event.id).subscribe(
                        res => {
                            console.log(res);
                        },
                        err => {
                            console.log(err);
                        }
                    );
                }
                location.reload();
            }
        });
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

@Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: './dialog-result-example-dialog.html'
})
export class DialogResultExampleDialog {
    constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
}
