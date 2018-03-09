import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GetUserListService } from '../../services/get-user-list.service';
import { LoginService } from '../../services/login.service';
import { RemoveUserService } from '../../services/remove-user.service';

import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    private selectedUser: User;
    private checked: boolean;
    private userList: User[];
    private allChecked: boolean;
    private removeUserList: User[] = new Array();

    constructor(
        private getUserListService: GetUserListService,
        private removeUserService: RemoveUserService,
        private router: Router,
        public dialog: MatDialog
    ) {}

    onSelect(user: User) {
        this.selectedUser = user;
        this.router.navigate(['/viewUser', this.selectedUser.id]);
    }

    openDialog(user: User) {
        const dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'yes') {
                this.removeUserService.sendUser(user.id).subscribe(
                    res => {
                        console.log(res);
                        this.getUserList();
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
        });
    }

    updateRemoveUserList(checked: boolean, user: User) {
        if (checked) {
            this.removeUserList.push(user);
        } else {
            this.removeUserList.splice(this.removeUserList.indexOf(user), 1);
        }
    }

    updateSelected(checked: boolean) {
        if (checked) {
            this.allChecked = true;
            this.removeUserList = this.userList.slice();
        } else {
            this.allChecked = false;
            this.removeUserList = [];
        }
    }

    removeSelectedUsers() {
        const dialogRef = this.dialog.open(DialogResultExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result == 'yes') {
                for (const user of this.removeUserList) {
                    this.removeUserService
                        .sendUser(user.id)
                        .subscribe(res => {}, err => {});
                }
                location.reload();
            }
        });
    }

    getUserList() {
        this.getUserListService.getUserList().subscribe(
            res => {
                console.log(res.json());
                this.userList = res.json();
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        this.getUserList();
    }
}

@Component({
    selector: 'dialog-result-example-dialog',
    templateUrl: './dialog-result-example-dialog.html'
})
export class DialogResultExampleDialog {
    constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>) {}
}
