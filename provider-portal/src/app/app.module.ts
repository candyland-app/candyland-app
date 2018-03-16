import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
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

import { AddEventService } from './services/add-event.service';
import { GetEventListService } from './services/get-event-list.service';
import { LoginService } from './services/login.service';
import { UploadImageService } from './services/upload-image.service';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        LoginComponent,
        AddNewEventComponent,
        EventListComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        routing,
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
        LoginService,
        GetEventListService,
        UploadImageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
