import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '../public/login/login.component';
import {RegisterComponent} from '../public/register/register.component';
import {HomeComponent} from '../public/home/home.component';
import {AccountComponent} from '../public/account/account.component';
import {LayoutComponent} from '../private/layout/layout.component';
import {UsersComponent} from '../private/users/users.component';
import {DashboardComponent} from '../private/dashboard/dashboard.component';
import {AccountsComponent} from '../private/accounts/accounts.component';
import {AdminGuard} from '../private/admin.guard';


const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'account' , component: AccountComponent},
  {path: 'admin' , component: LayoutComponent , canActivate: [AdminGuard], children : [
      {path: '' , redirectTo: 'dashboard' , pathMatch: 'full' },
      {path: 'users' , component: UsersComponent},
      {path: 'dashboard' , component: DashboardComponent},
      {path: 'accounts' , component: AccountsComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteModuleRoutingModule { }
