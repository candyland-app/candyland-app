import { Component } from '@angular/core';
import { HomeComponent } from './Guests/home/home.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Candyland';
  username: string = "John";
}
