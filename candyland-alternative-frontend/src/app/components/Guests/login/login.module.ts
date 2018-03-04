import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { AppComponent } from '../../../app.component';
import { LoginComponent } from './login.component';
import { HomeService } from '../home/home.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgModule,
    FormsModule,
    RouterModule,
    AppModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
