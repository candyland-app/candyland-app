import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { routing } from './app.routing';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatSelectModule,
  MatSlideToggleModule,
  MatInputModule,
  MatFormFieldModule,
  MatGridListModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";
import "hammerjs";

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './components/login/login.component';

import { LoginService } from './services/login.service';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, LoginComponent, AddNewEventComponent],
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
