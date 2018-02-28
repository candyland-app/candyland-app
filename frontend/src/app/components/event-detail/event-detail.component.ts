import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { OrderViewerService } from '../../services/order-viewer.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AppConst } from '../../constants/app-const';

@Component({
	selector: 'app-event-detail',
	templateUrl: './event-detail.component.html',
	styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

	private eventId: number;
	private event: Event = new Event();
	private serverPath = AppConst.serverPath;
	private numberList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	private quantity: number;

	private addEventSuccess: boolean = false;
	private notEnoughStock: boolean = false;

	constructor(
		private eventService: EventService,
		private orderViewerService: OrderViewerService,
		private router: Router,
		private http: Http,
		private route: ActivatedRoute
	) { }

	onAddToOrderViewer() {
		this.orderViewerService.addItem(this.eventId, this.quantity).subscribe(
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
				this.event = res.json();
			},
			error => {
				console.log(error);
			}
		);
		this.quantity = 1;
	}

}
