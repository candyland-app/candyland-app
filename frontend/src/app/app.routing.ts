import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { OrderViewerComponent } from './components/order-viewer/order-viewer.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

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
		path: 'eventList',
		component: EventListComponent
	},
	{
		path: 'eventDetail/:id',
		component: EventDetailComponent
	},
	{
		path: 'orderViewer',
		component: OrderViewerComponent
	},
	{
		path: 'checkout',
		component: OrderComponent
	},
	{
		path: 'orderSummary',
		component: OrderSummaryComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
