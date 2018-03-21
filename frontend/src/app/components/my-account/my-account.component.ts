import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private loginError = false;
    private loggedIn = false;
    private credential = {
        username: '',
        password: ''
    };

    private emailSent = false;
    private usernameExists: boolean;
    private emailExists: boolean;
    private username: string;
    private email: string;
    private hidebutton: boolean;
    private emailNotExists = false;
    private forgetPasswordEmailSent: boolean;
    private recoverEmail: string;

    constructor(
        private loginService: LoginService,
        private userService: UserService,
        private router: Router
    ) {}

    onLogin() {
        this.loginService
            .sendCredential(this.credential.username, this.credential.password)
            .subscribe(
                res => {
                    console.log(res);
                    localStorage.setItem('xAuthToken', res.json().token);
                    this.loggedIn = true;
                    location.reload();
                    this.router.navigate(['/home']);
                },
                error => {
                    this.loggedIn = false;
                    this.loginError = true;
                }
            );
    }

    onValidate() {
        this.hidebutton = true;
        setTimeout(() => {
            this.onNewAccount();
        }, 1000);
    }


    onNewAccount() {
        this.usernameExists = false;
        this.emailExists = false;
        this.emailSent = false;
        this.hidebutton = true;

        this.userService.newUser(this.username, this.email).subscribe(
            res => {
                console.log(res);
                this.emailSent = true;
            },
            error => {
                console.log(error.text());
                const errorMessage = error.text();
                if (errorMessage === 'usernameExists') {
                    this.usernameExists = true;
                }
                if (errorMessage === 'emailExists') {
                    this.emailExists = true;
                }
            }
        );

        this.hidebutton = false;
    }

    onForgetPassword() {
        this.forgetPasswordEmailSent = false;
        this.emailNotExists = false;

        this.userService.retrievePassword(this.recoverEmail).subscribe(
            res => {
                console.log(res);
                this.forgetPasswordEmailSent = true;
            },
            error => {
                console.log(error.text());
                const errorMessage = error.text();
                if (errorMessage === 'Email not found') {
                    this.emailNotExists = true;
                }
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
            }
        );
        this.hidebutton = false;
    }
}
