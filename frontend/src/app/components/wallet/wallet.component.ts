import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConst } from '../../constants/app-const';
import { User } from '../../models/user';
import { UserBilling } from '../../models/user-billing';
import { UserPayment } from '../../models/user-payment';
import { LoginService } from '../../services/login.service';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private dataFetched = false;
    private loginError: boolean;
    private loggedIn: boolean;
    private credential = { username: '', password: '' };
    private currentPassword: string;

    private user: User = new User();
    private updateSuccess: boolean;
    private newPassword: string;
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

    private invalidCardNo = false;
    private invalidCvc = false;
    private currentPoints = -1;
    private addedPoints = 0;
    private bonusPoints = 0;
    private noCards = false;
    private notPositive = false;
    private bonus = false;
    private pointsNeeded;

    constructor(
        private loginService: LoginService,
        private paymentService: PaymentService,
        private userService: UserService,
        private router: Router,
        private location: Location
    ) { }


    selectedBillingChange(val: number) {
        this.selectedBillingTab = val;
    }

    onUpdateUserInfo() {
        let guard = true;
        if (this.user.userPaymentList == []) guard = false;
        if (!guard) {
            console.log("No cards selected");
            this.noCards = true;
        }
        else if (this.addedPoints <= 0) {
            console.log("Can't substract points");
            this.notPositive = true;
        }
        else if (confirm("Are you sure you want do add points? ")) {

            this.user.walletPoints = this.currentPoints + this.addedPoints ;
            this.currentPoints = this.user.walletPoints;
            this.noCards = false;
            this.notPositive = false;
            this.bonus = false;
            this.pointsNeeded = 100 - Math.floor(this.user.walletPoints % 100);
            console.log(Math.floor(this.user.walletPoints) / 100);
            console.log(Math.floor(this.user.bonusPoints) / 10);
            if (Math.floor(this.user.walletPoints / 100) > Math.floor(this.user.bonusPoints / 10)) {
                this.bonusPoints = Math.floor(this.user.walletPoints / 100) - Math.floor(this.user.bonusPoints / 10);
                this.user.bonusPoints = 10 * Math.floor(this.user.walletPoints / 100);
                this.bonus = true;
                console.log("fds");

            }
            else this.bonusPoints = 0;

            this.userService
                .updateUserInfo(this.user, this.newPassword, this.currentPassword)
                .subscribe(
                    res => {
                        console.log(res.text());
                        this.updateSuccess = true;
                        this.updateUserInfo = true;
                    },
                    error => {
                        console.log(error.text());
                        const errorMessage = error.text();
                        if (errorMessage === 'Incorrect current password!') {
                            this.incorrectPassword = true;
                        }
                    }
                );


        }
    }

    getCurrentUser() {
        this.userService.getCurrentUser().subscribe(
            res => {
                this.user = res.json();
                this.userPaymentList = this.user.userPaymentList;
                this.currentPoints = this.user.walletPoints;
                this.bonusPoints = this.user.bonusPoints;
                console.log(this.user.walletPoints);
                console.log(Math.floor(this.user.walletPoints % 100))
                this.pointsNeeded = 100 - Math.floor(this.user.walletPoints % 100);
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
        if (this.userPayment.cardNumber.length !== 16) {
            this.invalidCardNo = true;
        } else if (
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

        for (const state in AppConst.usStates) {
            if (AppConst.usStates.hasOwnProperty(state)) {
                this.stateList.push(state);
            }
        }

        this.userBilling.userBillingState = '';
        this.userPayment.type = '';
        this.userPayment.expiryMonth = '';
        this.userPayment.expiryYear = '';
        this.userPayment.userBilling = this.userBilling;
        this.defaultPaymentSet = false;
        this.noCards = false;
        this.notPositive = false;
        this.bonus = false;
    }

    showInfo() {
        const popup = document.getElementById('myPopup');
        popup.classList.toggle('show');
    }

    doSomething() { }


}
