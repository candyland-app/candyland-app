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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

import { AddEventService } from './services/add-event.service';
import { GetEventListService } from './services/get-event-list.service';
import { GetEventService } from './services/get-event.service';
import { LoginService } from './services/login.service';
import { UploadImageService } from './services/upload-image.service';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        LoginComponent,
        AddNewEventComponent,
        EventListComponent,
        ViewEventComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        routing,
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
        GetEventService,
        LoginService,
        GetEventListService,
        UploadImageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
