import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, NavigationExtras } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
	private loggedIn = false;
	private keyword: string;
	private eventList: Event[] = [];

	constructor(
		private loginService: LoginService,
		private router: Router,
		private eventService: EventService
	) { }

	logout() {
		this.loginService.logout().subscribe(
			res => {
				location.reload();
			},
			err => {
				console.log(err);
			}
		);
	}

	onSearchByTitle() {
		this.eventService.searchEvent(this.keyword).subscribe(
			res => {
				this.eventList = res.json();
				console.log(this.eventList);
				let navigationExtras: NavigationExtras = {
					queryParams: {
						"eventList": JSON.stringify(this.eventList)
					}
				};
				this.router.navigate(['/eventList'], navigationExtras);
			},
			error => {
				console.log(error);
			}
		);
	}

	ngOnInit() {
		this.loginService.checkSession().subscribe(
			res => {
				this.loggedIn = true;
			},
			err => {
				this.loggedIn = false;
			}
		);
	}
}
