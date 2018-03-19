import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { CartItem } from '../../models/cart-item';
import { Order } from '../../models/order';
import { CheckoutService } from '../../services/checkout.service';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private order: Order = new Order();
    private cartItemList: CartItem[] = [];

    constructor(
        private checkoutService: CheckoutService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.order = JSON.parse(params['order']);

            this.cartItemList = this.order.cartItemList;
        });
    }
}
