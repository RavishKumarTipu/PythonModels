import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {WelcomeuserComponent} from './welcomeuser/welcomeuser.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  {path: 'login',component: LoginComponent },
  {path: 'welcome',component: WelcomeuserComponent },
  {path: 'admin', component: AdminComponent},
  {path: 'user', component: UserComponent},
  {path: '#', redirectTo : '', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
