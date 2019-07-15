import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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

import { MatBadgeModule,MatChipsModule,MatCheckboxModule,
        MatProgressSpinnerModule, MatCardModule,MatTableModule, MatDialogModule,MatInputModule,
        MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, 
        MatMenuModule, MatTable, MatExpansionModule, MatGridListModule, MatSelectModule,
        MatRadioModule,
      } from  '@angular/material';

import {ColorPickerModule} from 'ngx-color-picker';
import { MenuItemComponent } from './menu-item/menu-item.component';
import {MatDividerModule} from '@angular/material/divider';
import { CreateFETypeComponent } from './create-f-e-type/create-f-e-type.component';
import { CreateActionComponent } from './create-action/create-action.component';
import { ActionsComponent } from './actions/actions.component';
import { ActionComponent } from './action/action.component';
import { FooterComponent } from './footer/footer.component';
import { PyModelsComponent } from './py-models/py-models.component';
import { ImgtestComponent } from './imgtest/imgtest.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeuserComponent,
    AdminComponent,
    UserComponent,
    MenuItemComponent,
    CreateFETypeComponent,
    CreateActionComponent,
    ActionsComponent,
    ActionComponent,
    FooterComponent,
    PyModelsComponent,
    ImgtestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule,
    ColorPickerModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
