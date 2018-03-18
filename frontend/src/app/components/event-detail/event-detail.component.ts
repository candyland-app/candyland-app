import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { Event } from '../../models/event';
import { CartService } from '../../services/cart.service';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
    private eventId: number;
    private event: Event = new Event();
    private serverPath = AppConst.serverPath;
    private numberList: number[] = new Array();
    private qty: number;

    private addEventSuccess = false;
    private notEnoughStock = false;

    constructor(
        private cartService: CartService,
        private eventService: EventService,
        private router: Router,
        private http: Http,
        private route: ActivatedRoute
    ) {}

    onAddToCart() {
        this.cartService.addItem(this.eventId, this.qty).subscribe(
            res => {
                console.log(res.text());
                this.addEventSuccess = true;
            },
            err => {
                console.log(err.text());
                this.notEnoughStock = true;
            }
        );
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.eventId = Number.parseInt(params['id']);
        });
        this.eventService.getEvent(this.eventId).subscribe(
            res => {
                console.log(res.json());
                this.event = res.json();
                for (let i = 1; i <= this.event.availableTickets; i++) {
                    this.numberList.push(i);
                }
            },
            error => {
                console.log(error);
            }
        );
        this.qty = 1;
    }
}
