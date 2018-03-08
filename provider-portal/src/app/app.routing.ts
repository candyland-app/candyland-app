import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddNewEventComponent } from './components/add-new-event/add-new-event.component';

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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
