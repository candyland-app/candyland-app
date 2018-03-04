
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';
import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent {

  private submitted = false;
  private user: User = new User();
  private username = '';
  private password = '';
  constructor(private router: Router, private userService: LoginService) { }

  onSubmit() {
    this.user.username = this.username;
    this.user.password = this.password;
    console.log("Username: " + this.user.username);
    console.log("Password: " + this.user.password);
    this.submitted = true;
    console.log("Submit");
    // TODO AUTHENTICATE HERE
    this.userService.sendCredential(this.user.username, this.user.password);
    this.router.navigateByUrl(""); //TODO FIX URL

  }
}
