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
import {AdminGuard} from '../private/security/admin.guard';
import {NotFoundComponent} from '../public/not-found/not-found.component';
import {UpdateUserComponent} from '../private/update-user/update-user.component';
import {ProfileComponent} from '../public/profile/profile.component';
import {UserGuard} from '../public/security/user.guard';
import {DetailAccountComponent} from '../private/detail-account/detail-account.component';


const routes: Routes = [
  {path: '' , redirectTo: 'home' , pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'account' , component: AccountComponent, canActivate: [UserGuard]},
  {path: 'profile' , component: ProfileComponent, canActivate: [UserGuard]},
  {path: 'admin' , component: LayoutComponent , canActivate: [AdminGuard], children : [
      {path: '' , redirectTo: 'dashboard' , pathMatch: 'full' },
      {path: 'users' , component: UsersComponent},
      {path: 'users/update' , component: UpdateUserComponent},
      {path: 'dashboard' , component: DashboardComponent},
      {path: 'accounts' , component: AccountsComponent},
      {path: 'accounts/detail' , component: DetailAccountComponent},
    ]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteModuleRoutingModule { }
