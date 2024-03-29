import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { UserBilling } from '../../models/user-billing';
import { UserPayment } from '../../models/user-payment';
import { LoginService } from '../../services/login.service';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private dataFetched = false;
    private loginError: boolean;
    private loggedIn: boolean;
    private credential = { username: '', password: '' };
    private currentPassword: string;

    private user: User = new User();
    private updateSuccess: boolean;
    private newPassword: string;
    private valNewPassword: string;
    private incorrectPassword: boolean;
    private updateUserInfo = false;

    private selectedProfileTab = 0;
    private selectedBillingTab = 0;

    private userPayment: UserPayment = new UserPayment();
    private userBilling: UserBilling = new UserBilling();
    private userPaymentList: UserPayment[] = [];
    private defaultPaymentSet: boolean;
    private defaultUserPaymentId: number;
    private stateList: string[] = [];
    private updateUserPaymentInfo: boolean;
    private hidebutton: boolean;

    private invalidCardNo = false;
    private invalidCvc = false;

    private orderList: Order[] = [];
    private order: Order = new Order();
    private displayOrderDetail: boolean;

    constructor(
        private loginService: LoginService,
        private paymentService: PaymentService,
        private orderService: OrderService,
        private userService: UserService,
        private router: Router
    ) {}

    selectedBillingChange(val: number) {
        this.selectedBillingTab = val;
    }
    private dontMatch = false;
    onValidate()    {

        if (this.newPassword === this.valNewPassword) {
            this.dontMatch = false;
            this.onUpdateUserInfo();
        }
        else this.dontMatch = true;
    }
    private simplealert = true;
    onValidate2() {

        this.simplealert = this.cardTypeValidator && this.namevalidator && this.namevalidator2 && this.namevalidator3 && this.namevalidator5 && this.namevalidator4;
        if (this.simplealert) {

            setTimeout(() => {
                this.onNewPayment();
            }, 1000);
        }

    }


    private cardTypeValidator = true;
    validateType(type: string) {
        if (type != '') this.cardTypeValidator = true;
        else this.cardTypeValidator = false;
    }
    private namevalidator = true;
    validateName(name: string) {
        if (name != null && name != "") this.namevalidator = true;
        else this.namevalidator = false;
    }
    private namevalidator2 = true;
    validateName2(name: string) {
        if (name != null && name != "") this.namevalidator2 = true;
        else this.namevalidator2 = false;
    }
    private namevalidator3 = true;
    validateName3(name: string) {
        if (name != null && name != "") this.namevalidator3 = true;
        else this.namevalidator3 = false;
    }
    private namevalidator4 = true;
    validateName4(name: string) {
        if (name != null && name != "") this.namevalidator4 = true;
        else this.namevalidator4 = false;
    }
    private namevalidator5 = true;
    validateName5(name: string) {
        if (name != null && name != "") this.namevalidator5 = true;
        else this.namevalidator5 = false;
    }

    onUpdateUserInfo() {
        this.userService
            .updateUserInfo(this.user, this.newPassword, this.currentPassword)
            .subscribe(
                res => {
                    console.log(res.text());
                    this.updateSuccess = true;
                    this.updateUserInfo = true;
                    this.incorrectPassword = false;
                },
                error => {
                    console.log(error.text());
                    const errorMessage = error.text();
                    this.updateSuccess = false;
                    if (errorMessage === 'Incorrect current password!') {
                        this.incorrectPassword = true;
                    }
                }
            );
    }

    getCurrentUser() {
        this.userService.getCurrentUser().subscribe(
            res => {
                this.user = res.json();
                this.userPaymentList = this.user.userPaymentList;

                for (const index in this.userPaymentList) {
                    if (this.userPaymentList[index].defaultPayment) {
                        this.defaultUserPaymentId = this.userPaymentList[
                            index
                        ].id;
                        break;
                    }
                }

                this.dataFetched = true;
            },
            err => {
                console.log(err);
            }
        );
    }

    onNewPayment() {
        if (this.userPayment.cardNumber == null || this.userPayment.cardNumber.length !== 16) {
            this.invalidCardNo = true;
        } else if (
            this.userPayment.cvc == null ||
            this.userPayment.cvc.toString().length > 4 ||
            this.userPayment.cvc.toString().length < 3
        ) {
            this.invalidCvc = true;
        } else {
            this.invalidCardNo = false;
            this.invalidCvc = false;
            this.paymentService.newPayment(this.userPayment).subscribe(
                res => {
                    this.getCurrentUser();
                    this.selectedBillingTab = 0;
                    this.updateUserPaymentInfo = true;
                },
                error => {
                    console.log(error.text());
                }
            );
        }
    }

    onUpdatePayment(payment: UserPayment) {
        this.userPayment = payment;
        this.userBilling = payment.userBilling;
        this.selectedBillingTab = 1;
        this.updateUserPaymentInfo = true;
    }

    onRemovePayment(id: number) {
        this.paymentService.removePayment(id).subscribe(
            res => {
                this.getCurrentUser();
                this.updateUserPaymentInfo = true;
            },
            error => {
                console.log(error.text());
            }
        );
    }

    setDefaultPayment() {
        this.defaultPaymentSet = false;
        this.paymentService
            .setDefaultPayment(this.defaultUserPaymentId)
            .subscribe(
                res => {
                    this.getCurrentUser();
                    this.defaultPaymentSet = true;
                },
                error => {
                    console.log(error.text());
                }
            );
    }

    onDisplayOrder(order: Order) {
        console.log(order);
        this.order = order;
        this.displayOrderDetail = true;
    }

    ngOnInit() {
        this.loginService.checkSession().subscribe(
            res => {
                this.loggedIn = true;
            },
            error => {
                this.loggedIn = false;
                console.log('inactive session');
                this.router.navigate(['/myAccount']);
            }
        );

        this.getCurrentUser();

        this.orderService.getOrderList().subscribe(
            res => {
                this.orderList = res.json();
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

        this.userBilling.userBillingState = '';
        this.userPayment.type = 'visa';
        this.userPayment.expiryMonth = '';
        this.userPayment.expiryYear = '';
        this.userPayment.userBilling = this.userBilling;
        this.defaultPaymentSet = false;
        this.hidebutton = false;
        this.newPassword = "";
        this.valNewPassword = "";
        this.currentPassword = "";
    }
}
