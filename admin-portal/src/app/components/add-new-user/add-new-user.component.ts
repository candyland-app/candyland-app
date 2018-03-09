import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AddUserService } from '../../services/add-user.service';
import { UploadImageService } from '../../services/upload-image.service';

@Component({
    selector: 'app-add-new-user',
    templateUrl: './add-new-user.component.html',
    styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {
    private newUser: User = new User();
    private userAdded: boolean;

    constructor(
        private addUserService: AddUserService,
        private uploadImageService: UploadImageService
    ) {}

    onSubmit() {
        this.addUserService.sendUser(this.newUser).subscribe(
            res => {
                this.uploadImageService.upload(
                    JSON.parse(JSON.parse(JSON.stringify(res))._body).id
                );
                this.userAdded = true;
                this.newUser = new User();
                this.newUser.locked = false;
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        this.userAdded = false;
        this.newUser.locked = true;
    }
}
