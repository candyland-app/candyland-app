import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { Router } from '@angular/router';
import { Event } from '../../models/event';
import { OrderViewerService } from '../../services/order-viewer.service';
import { OrderViewer } from '../../models/order-viewer';
import { OrderItem } from '../../models/order-item';

@Component({
	selector: 'app-order-viewer',
	templateUrl: './order-viewer.component.html',
	styleUrls: ['./order-viewer.component.css']
})
export class OrderViewerComponent implements OnInit {
	private serverPath = AppConst.serverPath;
	private selectedEvent: Event;
	private orderItemNumber: number;
	private orderItemUpdated: boolean;
	private orderItemList: OrderItem[] = [];
	private orderViewer: OrderViewer = new OrderViewer();

	constructor(
		private router: Router,
		private orderViewerService: OrderViewerService
	) { }

	onSelect(event: Event) {
		this.selectedEvent = event;
		this.router.navigate(['/eventDetail', this.selectedEvent.id]);
	}

	onRemoveOrderItem(orderItem: OrderItem) {
		this.orderViewerService.removeOrderItem(orderItem.id).subscribe(
			res => {
				console.log(res.text());
				this.getOrderItemList();
				this.getOrderViewer();
			},
			error => {
				console.log(error.text());
			}
		);
	}

	onUpdateOrderItem(orderItem: OrderItem) {
		this.orderViewerService.updateOrderItem(orderItem.id, orderItem.quantity).subscribe(
			res => {
				console.log(res.text());
				this.orderItemUpdated = true;
				this.getOrderViewer();
			},
			error => {
				console.log(error.text());
			}
		)
	}

	getOrderItemList() {
		this.orderViewerService.getOrderItemList().subscribe(
			res => {
				this.orderItemList = res.json();
				this.orderItemNumber = this.orderItemList.length;
			},
			error => {
				console.log(error.text());
			}
		)
	}

	getOrderViewer() {
		this.orderViewerService.getOrderViewer().subscribe(
			res => {
				console.log(res.json());
				this.orderViewer = res.json();
			},
			error => {
				console.log(error.text());
			}
		)
	}

	ngOnInit() {
		this.getOrderItemList();
		this.getOrderViewer();
	}
}
