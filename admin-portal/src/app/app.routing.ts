import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

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
        path: 'addNewUser',
        component: AddNewUserComponent
    },
    {
        path: 'userList',
        component: UserListComponent
    },
    {
        path: 'viewUser/:id',
        component: ViewUserComponent
    },
    {
        path: 'editUser/:id',
        component: EditUserComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
