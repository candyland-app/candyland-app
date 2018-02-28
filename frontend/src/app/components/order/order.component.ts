import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app-const';
import { Event } from '../../models/event';
import { Router, NavigationExtras } from "@angular/router";
import { OrderViewerService } from '../../services/order-viewer.service';
import { PaymentService } from '../../services/payment.service';
import { CheckoutService } from '../../services/checkout.service';
import { OrderItem } from '../../models/order-item';
import { OrderViewer } from '../../models/order-viewer';
import { BillingAddress } from '../../models/billing-address';
import { UserBilling } from '../../models/user-billing';
import { Payment } from '../../models/payment';
import { Order } from '../../models/order';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	private serverPath = AppConst.serverPath;
	private selectedEvent: Event;
	private orderItemList: OrderItem[] = [];
	private orderItemNumber: number;
	private orderViewer: OrderViewer = new OrderViewer();
	private orderItemUpdated: boolean;
	private billingAddress: BillingAddress = new BillingAddress();
	private userBilling: UserBilling = new UserBilling();
	private payment: Payment = new Payment();
	private selectedTab: number;
	private emptyPaymentList: boolean = true;
	private order: Order = new Order();

	constructor(
		private router: Router,
		private orderViewerService: OrderViewerService,
		private paymentService: PaymentService,
		private checkoutService: CheckoutService
	) { }

	onSelect(event: Event) {
		this.selectedEvent = event;
		this.router.navigate(['/eventDetail', this.selectedEvent.id]);
	}

	selectedChange(val: number) {
		this.selectedTab = val;
	}

	goToPayment() {
		this.selectedTab = 1;
	}

	goToReview() {
		this.selectedTab = 2;
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
		);
	}

	setPaymentMethod(userPayment: UserPayment) {
		this.payment.type = userPayment.type;
		this.payment.cardNumber = userPayment.cardNumber;
		this.payment.expiryMonth = userPayment.expiryMonth;
		this.payment.expiryYear = userPayment.expiryYear;
		this.payment.cvc = userPayment.cvc;
		this.payment.holderName = userPayment.holderName;
		this.billingAddress.billingAddressName = userPayment.userBilling.userBillingName;
		this.billingAddress.billingAddressPostalCode = userPayment.userBilling.userBillingPostalCode;
	}

	onSubmit() {
		this.checkoutService.checkout(
			this.billingAddress,
			this.payment
		).subscribe(
			res => {
				this.order = res.json();
				console.log(this.order);
				let navigationExtras: NavigationExtras = {
					queryParams: {
						"order": JSON.stringify(this.order)
					}
				};
				this.router.navigate(['/orderSummary'], navigationExtras);
			},
			error => {
				console.log(error.text());
			}
			);
	}

	ngOnInit() {
		this.getOrderItemList();
		this.orderViewerService.getOrderViewer().subscribe(
			res => {
				console.log(res.json());
				this.orderViewer = res.json();
			},
			error => {
				console.log(error.text());
			}
		);
		this.payment.expiryMonth = "";
		this.payment.expiryYear = "";
		this.billingAddress.billingAddressState = "";
	}
}
