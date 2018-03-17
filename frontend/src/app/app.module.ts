import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTabsModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { routing } from './app.routing';

import { LoginService } from './services/login.service';
import { PaymentService } from './services/payment.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app.component';
import { DemoMapComponent } from './components/demo-map/demo-map.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { EventComponent } from './components/event/event.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
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
        WalletComponent
    ],
    imports: [
        NgbModule.forRoot(),
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
    providers: [LoginService, UserService, PaymentService],
    bootstrap: [AppComponent]
})
export class AppModule {}
