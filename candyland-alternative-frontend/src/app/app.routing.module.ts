import { FooterComponent } from './components/Guests/footer/footer.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Guests/home/home.component';
import { LoginComponent } from './components/Guests/login/login.component';
import { NavbarComponent } from './components/Guests/nav-bar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'footer', component: FooterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  bootstrap: [ AppComponent ]
})
class AppModule {}
