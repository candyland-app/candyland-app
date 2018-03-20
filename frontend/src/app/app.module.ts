import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from '@cmglez10/ng-datatable';
import 'hammerjs';
import { routing } from './app.routing';
import { DataFilterPipe } from './components/event-list/data-filter.pipe';

import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { EventService } from './services/event.service';
import { LoginService } from './services/login.service';
import { OrderService } from './services/order.service';
import { PaymentService } from './services/payment.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { DemoMapComponent } from './components/demo-map/demo-map.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventComponent } from './components/event/event.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TeamComponent } from './components/team/team.component';
import { WalletComponent } from './components/wallet/wallet.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavBarComponent,
        MyAccountComponent,
        MyProfileComponent,
        FaqComponent,
        TeamComponent,
        DemoMapComponent,
        FooterComponent,
        EventsListComponent,
        EventComponent,
        WalletComponent,
        EventListComponent,
        DataFilterPipe,
        EventDetailComponent,
        ShoppingCartComponent,
        OrderComponent,
        OrderSummaryComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        DataTableModule,
        BrowserModule,
        FormsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatButtonModule,
        routing,
        MatCheckboxModule
    ],
    providers: [
        OrderService,
        CheckoutService,
        EventService,
        CartService,
        LoginService,
        UserService,
        PaymentService,
        DataFilterPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
