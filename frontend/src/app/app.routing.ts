import { FaqComponent } from './components/faq/faq.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MyAccountComponent } from "./components/my-account/my-account.component";
import { MyProfileComponent } from "./components/my-profile/my-profile.component";
import { TeamComponent } from './components/team/team.component';
import { DemoMapComponent } from './components/demo-map/demo-map.component';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "myAccount",
    component: MyAccountComponent
  },
  {
    path: "myProfile",
    component: MyProfileComponent
  },
  {
    path: "faq",
    component: FaqComponent
  },
  {
    path: "team",
    component: TeamComponent
  },
  {
    path: "map",
    component: DemoMapComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
