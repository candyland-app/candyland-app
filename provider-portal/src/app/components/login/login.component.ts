import { Component, OnInit } from '@angular/core';
import { UserBilling } from '../../models/user-billing';
import { UserPayment } from '../../models/user-payment';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private credential = { username: '', password: '' };
    private loggedIn = false;
    private logginerror = false;
    private dataFetched = false;
    private userPayment: UserPayment = new UserPayment();
    private userBilling: UserBilling = new UserBilling();
    private userPaymentList: UserPayment[] = [];
    private user: User = new User();
    private defaultUserPaymentId: number;
    private banned = false;

    constructor(private loginService: LoginService, private userService: UserService, private router: Router) { }

    onSubmit() {
        this.loginService
            .sendCrendential(this.credential.username, this.credential.password)
            .subscribe(
                res => {
                    console.log(res);
                    localStorage.setItem('xAuthToken', res.json().token);
                    this.loggedIn = true;
                    location.reload();
                },
                error => {
                    this.loggedIn = false;
                    this.logginerror = false;
                    console.log(error);
                }
            );
    }

    print() {
        this.getCurrentUser();
        alert(this.dataFetched);
        console.log(this.user.username);
        console.log(this.user)
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

    logout() {
        this.loginService.logout().subscribe(
            res => {
                location.reload();
            },
            error => {
                console.log(error);
            }
        );
        this.router.navigate(['/']);
    }

    gotoList() {
        this.router.navigate(['eventList']);
    }

    ngOnInit() {
        this.loginService.checkSession().subscribe(
            res => {
                this.loggedIn = true;
            },
            error => {
                this.loggedIn = false;
                console.log('inactive session');
            }
        );
        //alert("Executing getcurrentuser");
        this.getCurrentUser();
        setTimeout(() => {
            console.log(this.user.username);

            if (this.user.role == 1) {
                this.banned = true;
                this.logout();
            }
        }, 500);


    }
}
