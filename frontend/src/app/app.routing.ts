import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './components/faq/faq.component';

import { DemoMapComponent } from './components/demo-map/demo-map.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TeamComponent } from './components/team/team.component';
import { WalletComponent } from './components/wallet/wallet.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'myAccount',
        component: MyAccountComponent
    },
    {
        path: 'myProfile',
        component: MyProfileComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'map',
        component: DemoMapComponent
    },
    {
        path: 'eventList',
        component: EventListComponent
    },
    {
        path: 'eventDetail/:id',
        component: EventDetailComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    },
    {
        path: 'event/:id',
        component: EventComponent
    },
    {
        path: 'shoppingCart',
        component: ShoppingCartComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
