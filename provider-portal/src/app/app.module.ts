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
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import {
    DialogResultExampleDialog,
    EventListComponent
} from './components/event-list/event-list.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReportComponent } from './components/report/report.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

import { AddEventService } from './services/add-event.service';
import { EditEventService } from './services/edit-event.service';
import { GetEventListService } from './services/get-event-list.service';
import { GetEventService } from './services/get-event.service';
import { LoginService } from './services/login.service';
<<<<<<< HEAD
import { OrderService } from './services/order.service';
=======
import { UserService } from './services/user.service';
>>>>>>> a475a09f1434492fbd0cf01d0a1c4e2df9433089
import { RemoveEventService } from './services/remove-event.service';
import { UploadImageService } from './services/upload-image.service';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        ReportComponent,
        LoginComponent,
        AddNewEventComponent,
        DialogResultExampleDialog,
        EventListComponent,
        ViewEventComponent,
        EditEventComponent
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
        AddEventService,
        EditEventService,
        GetEventService,
        LoginService,
        GetEventListService,
        RemoveEventService,
        UploadImageService,
<<<<<<< HEAD
        OrderService
=======
        UserService
>>>>>>> a475a09f1434492fbd0cf01d0a1c4e2df9433089
    ],
    bootstrap: [AppComponent, DialogResultExampleDialog]
})
export class AppModule {}
