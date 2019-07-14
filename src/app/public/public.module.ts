import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import {AccountComponent} from './account/account.component';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, FooterComponent, HeaderComponent, AccountComponent],
  providers: [AuthService],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbCarouselModule,
    NgxSpinnerModule,

  ]
})
export class PublicModule { }
