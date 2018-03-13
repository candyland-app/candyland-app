import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from './components/faq/faq.component';

import { DemoMapComponent } from './components/demo-map/demo-map.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
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
        component: EventsListComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
