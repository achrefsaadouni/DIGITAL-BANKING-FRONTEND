import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbCarouselModule,

  ]
})
export class PublicModule { }
