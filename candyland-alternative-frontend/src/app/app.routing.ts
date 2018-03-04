import { FooterComponent } from './Guests/footer/footer.component';
import { HomeComponent } from './Guests/home/home.component';
import { LoginComponent } from './Guests/login/login.component';
import { NavbarComponent } from './Guests/nav-bar/navbar.component';
import {RouterModule, Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent}, 
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'footer', component: FooterComponent }
];

export const appRoutingProviders: any[] = [];