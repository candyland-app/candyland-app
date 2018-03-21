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
    private hidebutton2: boolean;
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

        if (this.emailvalidator && this.namevalidator) {
            this.hidebutton = true;
            this.hidebutton2 = true;
            setTimeout(() => {
                this.onNewAccount();
            }, 1000);
        }
    }


    onNewAccount() {
        this.usernameExists = false;
        this.emailExists = false;
        this.emailSent = false;
        this.hidebutton = true;
        this.hidebutton2 = true;

        this.userService.newUser(this.username, this.email).subscribe(
            res => {
                console.log(res);
                this.emailSent = true;
                this.hidebutton = false;
                this.hidebutton2 = false;
            },
            error => {
                console.log(error.text());
                const errorMessage = error.text();
                this.hidebutton = false;
                this.hidebutton2 = false;
                if (errorMessage === 'usernameExists') {
                    this.usernameExists = true;
                }
                if (errorMessage === 'emailExists') {
                    this.emailExists = true;
                }
            }
        );



    }
    private emailvalidator: boolean;
    private namevalidator: boolean;
    validateEmail(mail: string) {

        if (mail != null && (mail.indexOf(".") > mail.indexOf("@")) && mail.indexOf("@") > -1) this.emailvalidator = true;
        else this.emailvalidator = false;
    }

    validateUsername(name: string) {
        if (name != null && name != "") this.namevalidator = true;
        else this.namevalidator = false;
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
        this.hidebutton = false;
    }
}
