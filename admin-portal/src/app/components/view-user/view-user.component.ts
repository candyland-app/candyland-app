import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { GetUserService } from '../../services/get-user.service';
import { User } from '../../models/user';

@Component({
	selector: 'app-view-user',
	templateUrl: './view-user.component.html',
	styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

	private user: User = new User();
	private userId: number;

	constructor(private getUserService: GetUserService,
		private route: ActivatedRoute, private router: Router) { }

	onSelect(user: User) {
		this.router.navigate(['/editUser', this.user.id])
			// .then(s => location.reload())
			;
	}

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.userId = Number.parseInt(params['id']);
		});

		this.getUserService.getUser(this.userId).subscribe(
			res => {
				this.user = res.json();
			},
			error => {
				console.log(error);
			}
		);
	}
}