import { FooterComponent } from './Guests/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {appRoutes, appRoutingProviders} from './app.routing';
import { HomeComponent } from './Guests/home/home.component';
import { HomeService } from './Guests/home/home.service';
import { LoginComponent } from './Guests/login/login.component';
import { NavbarComponent } from './Guests/nav-bar/navbar.component';
import { RouterModule } from '@angular/router';
import { provideRoutes} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [HomeService, appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
