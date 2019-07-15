import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {CookieService} from 'ngx-cookie-service';
import { WelcomeuserComponent } from './welcomeuser/welcomeuser.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' ;
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  

import {MatMenuModule, MatButtonModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeuserComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
