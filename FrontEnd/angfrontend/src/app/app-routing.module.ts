import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {WelcomeuserComponent} from './welcomeuser/welcomeuser.component';
import {AdminComponent} from './admin/admin.component';
import {UserComponent} from './user/user.component';
import {CreateActionComponent} from './create-action/create-action.component';
import { CreateFETypeComponent } from './create-f-e-type/create-f-e-type.component';
import {PyModelsComponent} from './py-models/py-models.component';
import { ImgtestComponent } from './imgtest/imgtest.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent },
  {path: 'welcome',component: WelcomeuserComponent },
  {path: 'admin', component: AdminComponent},
  {path: 'user', component: UserComponent},
  {path: '#', redirectTo : '', pathMatch: 'full' },
  {path: "createaction", component: CreateActionComponent},
  {path :"createfetype", component:CreateFETypeComponent},  
  {path :"pyModels", component:PyModelsComponent},  
  {path :'pyImageTest', component:ImgtestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
