import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { routing } from './app.routing';

import { AddUserService } from './services/add-user.service';
import { EditUserService } from './services/edit-user.service';
import { GetUserListService } from './services/get-user-list.service';
import { GetUserService } from './services/get-user.service';
import { LoginService } from './services/login.service';
import { RemoveUserService } from './services/remove-user.service';
import { UploadImageService } from './services/upload-image.service';

import { AppComponent } from './app.component';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {
    DialogResultExampleDialog,
    UserListComponent
} from './components/user-list/user-list.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        LoginComponent,
        AddNewUserComponent,
        UserListComponent,
        DialogResultExampleDialog,
        ViewUserComponent,
        EditUserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MatButtonModule,
        MatCheckboxModule
    ],
    providers: [
        LoginService,
        AddUserService,
        UploadImageService,
        GetUserListService,
        GetUserService,
        EditUserService,
        RemoveUserService
    ],
    bootstrap: [AppComponent, DialogResultExampleDialog]
})
export class AppModule {}
