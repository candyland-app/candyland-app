import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { routing } from './app.routing';
import 'hammerjs';

import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './components/event-list/data-filter.pipe';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { OrderViewerComponent } from './components/order-viewer/order-viewer.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { EventService } from './services/event.service';
import { LoginService } from './services/login.service';
import { PaymentService } from './services/payment.service';
import { CheckoutService } from './services/checkout.service';
import { OrderViewerService } from './services/order-viewer.service';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavBarComponent,
		MyAccountComponent,
		MyProfileComponent,
		EventListComponent,
		DataFilterPipe,
		EventDetailComponent,
		OrderViewerComponent,
		OrderComponent,
		OrderSummaryComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		MaterialModule,
		DataTableModule
	],
	providers: [
		LoginService,
		UserService,
		PaymentService,
		EventService,
		OrderViewerService,
		OrderService,
		CheckoutService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
