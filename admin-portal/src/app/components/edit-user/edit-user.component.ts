import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../services/upload-image.service';
import { User } from '../../models/user';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { GetUserService } from '../../services/get-user.service';
import { EditUserService } from '../../services/edit-user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private userId: number;
  private user: User = new User();
  private userUpdated: boolean;

  constructor(
  	private uploadImageService: UploadImageService,
  	private editUserService: EditUserService,
  	private getUserService: GetUserService,
  	private route: ActivatedRoute,
  	private router: Router
  	) { }

  onSubmit() {
  	this.editUserService.sendUser(this.user).subscribe(
  		data => {
  			this.uploadImageService.modify(JSON.parse(JSON.parse(JSON.stringify(data))._body).id);
  			this.userUpdated=true;
  		},
  		error => console.log(error)
  	);
  }

  ngOnInit() {
  	this.route.params.forEach((params: Params) => {
  		this.userId = Number.parseInt(params['id']);
  	});

  	this.getUserService.getUser(this.userId).subscribe(
  		res => {
  			this.user = res.json();
  		},
  		error => console.log(error)
  	)
  }

}
