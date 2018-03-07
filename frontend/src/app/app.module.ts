import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatTabsModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import 'hammerjs';

import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { PaymentService } from './services/payment.service';

import { AppComponent } from './app.component';
import { FaqComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TeamComponent } from './components/team/team.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MyAccountComponent,
    MyProfileComponent,
    FaqComponent,
    TeamComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    routing,
    MatCheckboxModule
  ],
  providers: [
    LoginService,
    UserService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
