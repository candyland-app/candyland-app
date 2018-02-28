import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../../services/checkout.service';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';


@Component({
	selector: 'app-order-summary',
	templateUrl: './order-summary.component.html',
	styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
	private serverPath = AppConst.serverPath;
	private order: Order = new Order();
	private estimatedDeliveryDate: string;
	private orderItemList: OrderItem[] = [];

	constructor(
		private checkoutService: CheckoutService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.order = JSON.parse(params['order']);
			this.orderItemList = this.order.orderItemList;
		});
	}
}
