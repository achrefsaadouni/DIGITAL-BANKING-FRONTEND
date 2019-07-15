import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublicModule} from '../public/public.module';
import { LayoutComponent } from './layout/layout.component';
import {RouterModule} from '@angular/router';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {UserService} from './services/user.service';




@NgModule({
  declarations: [LayoutComponent, UsersComponent, DashboardComponent, AccountsComponent],
  imports: [
    CommonModule,
    PublicModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxSpinnerModule
  ],
  providers:  [
     UserService]
})
export class PrivateModule { }
