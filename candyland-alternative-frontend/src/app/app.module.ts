import { FooterComponent } from './components/Guests/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {appRoutes, appRoutingProviders} from './app.routing';
import { HomeComponent } from './components/Guests/home/home.component';
import { HomeService } from './components/Guests/home/home.service';
import { LoginComponent } from './components/Guests/login/login.component';
import { NavbarComponent } from './components/Guests/nav-bar/navbar.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'
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
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [HomeService, appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
