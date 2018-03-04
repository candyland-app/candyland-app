import { FooterComponent } from './components/Guests/footer/footer.component';
import { HomeComponent } from './components/Guests/home/home.component';
import { LoginComponent } from './components/Guests/login/login.component';
import { NavbarComponent } from './components/Guests/nav-bar/navbar.component';
import {RouterModule, Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent}, 
  {path: 'navbar', component: NavbarComponent},
  {path: 'login', component: LoginComponent},
  { path: 'footer', component: FooterComponent }
];

export const appRoutingProviders: any[] = [];