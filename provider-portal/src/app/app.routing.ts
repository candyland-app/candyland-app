import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { LoginComponent } from './components/login/login.component';
import { ViewEventComponent } from './components/view-event/view-event.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'addNewEvent',
        component: AddNewEventComponent
    },
    {
        path: 'eventList',
        component: EventListComponent
    },
    {
        path: 'viewEvent/:id',
        component: ViewEventComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
