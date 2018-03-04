import { HomeService } from "./home.service";
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  username: string = "fdas";
  password: string = 'Password';


  constructor(private loginService: HomeService) {

  }
  
  ngOnInit(): void {
    this.username = "yorgen";
  }

  
  onClick() {
    this.username = this.loginService.getUsername();
    console.log("Click")
  }
}

