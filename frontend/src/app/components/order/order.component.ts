import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { BillingAddress } from '../../models/billing-address';
import { CartItem } from '../../models/cart-item';
import { Event } from '../../models/event';
import { Order } from '../../models/order';
import { Payment } from '../../models/payment';
import { ShoppingCart } from '../../models/shopping-cart';
import { UserBilling } from '../../models/user-billing';
import { UserPayment } from '../../models/user-payment';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { PaymentService } from '../../services/payment.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private selectedEvent: Event;
    private cartItemList: CartItem[] = [];
    private cartItemNumber: number;
    private shoppingCart: ShoppingCart = new ShoppingCart();
    private cartItemUpdated: boolean;
    private billingAddress: BillingAddress = new BillingAddress();
    private userPayment: UserPayment = new UserPayment();
    private userBilling: UserBilling = new UserBilling();
    private userPaymentList: UserPayment[] = [];
    private payment: Payment = new Payment();
    private selectedTab: number;
    private emptyShippingList = true;
    private emptyPaymentList = true;
    private stateList: string[] = [];
    private order: Order = new Order();
    private processingCheckout = false;

    constructor(
        private router: Router,
        private cartService: CartService,
        private paymentService: PaymentService,
        private checkoutService: CheckoutService
    ) {}

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

    getCartItemList() {
        this.cartService.getCartItemList().subscribe(
            res => {
                this.cartItemList = res.json();
                this.cartItemNumber = this.cartItemList.length;
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
        this.payment.defaultPayment = userPayment.defaultPayment;
        this.billingAddress.billingAddressName =
            userPayment.userBilling.userBillingName;
        this.billingAddress.billingAddressStreet1 =
            userPayment.userBilling.userBillingStreet1;
        this.billingAddress.billingAddressStreet2 =
            userPayment.userBilling.userBillingStreet2;
        this.billingAddress.billingAddressCity =
            userPayment.userBilling.userBillingCity;
        this.billingAddress.billingAddressState =
            userPayment.userBilling.userBillingState;
        this.billingAddress.billingAddressCountry =
            userPayment.userBilling.userBillingCountry;
        this.billingAddress.billingAddressZipcode =
            userPayment.userBilling.userBillingZipcode;
    }

    setDefaultPaymentMethod() {
        this.payment.type = "No Card";
        this.payment.cardNumber = "000000000000";
        this.payment.expiryMonth = "4";
        this.payment.expiryYear = "2020";
        this.payment.cvc = 0;
        this.payment.holderName = "No holder name";
        this.payment.defaultPayment = null;
        this.billingAddress.billingAddressName = "no address";
        this.billingAddress.billingAddressStreet1 = "no street";
        this.billingAddress.billingAddressStreet2 = "no street";
        this.billingAddress.billingAddressCity = "no city";
        this.billingAddress.billingAddressState = "no state";
        this.billingAddress.billingAddressCountry = "no country";
        this.billingAddress.billingAddressZipcode = "0";
    }

    onValidate() {
        this.processingCheckout = true;
        this.setDefaultPaymentMethod();
        setTimeout(() => {
            this.onSubmit();
        }, 1000);
    }

    onSubmit() {
        this.checkoutService
            .checkout(this.billingAddress, this.payment)
            .subscribe(
                res => {
                    this.order = res.json();
                    console.log(this.order);

                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            order: JSON.stringify(this.order)
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
        this.processingCheckout = false;
        this.getCartItemList();

        this.cartService.getShoppingCart().subscribe(
            res => {
                console.log(res.json());
                this.shoppingCart = res.json();
            },
            error => {
                console.log(error.text());
            }
        );

        this.paymentService.getUserPaymentList().subscribe(
            res => {
                console.log(res.json());
                this.userPaymentList = res.json();
                this.emptyPaymentList = false;

                if (this.userPaymentList.length) {
                    this.emptyPaymentList = false;

                    for (const userPayment of this.userPaymentList) {
                        if (userPayment.defaultPayment) {
                            this.setPaymentMethod(userPayment);
                            return;
                        }
                    }
                }
                else {

                }
            },
            error => {
                console.log(error.text());
            }
        );

        for (const state in AppConst.usStates) {
            if (AppConst.usStates.hasOwnProperty(state)) {
                this.stateList.push(state);
            }
        }

        this.payment.type = '';
        this.payment.expiryMonth = '';
        this.payment.expiryYear = '';
        this.billingAddress.billingAddressState = '';
    }
}
