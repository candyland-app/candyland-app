import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { routing } from './app.routing';

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

import { AddUserService } from './services/add-user.service';
import { EditUserService } from './services/edit-user.service';
import { GetUserListService } from './services/get-user-list.service';
import { GetUserService } from './services/get-user.service';
import { LoginService } from './services/login.service';
import { RemoveUserService } from './services/remove-user.service';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        LoginComponent,
        AddNewUserComponent,
        DialogResultExampleDialog,
        UserListComponent,
        ViewUserComponent,
        EditUserComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        routing,
        MatDialogModule,
        MatListModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatGridListModule,
        MatToolbarModule,
        BrowserModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatButtonModule,
        MatCheckboxModule
    ],
    providers: [
        AddUserService,
        EditUserService,
        GetUserService,
        LoginService,
        GetUserListService,
        RemoveUserService
    ],
    bootstrap: [AppComponent, DialogResultExampleDialog]
})
export class AppModule {}
