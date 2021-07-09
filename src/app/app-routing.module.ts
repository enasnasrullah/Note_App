import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{path:'',redirectTo:'profile',pathMatch:'full'},
{path:'profile',canActivate:[AuthGuard],component:ProfileComponent},
{path:'login',component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'**',component:NotfoundComponent}];

@NgModule({
imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
