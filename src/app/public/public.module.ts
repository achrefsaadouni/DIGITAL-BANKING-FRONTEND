import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from '@angular/router';
import {AuthService} from './shared/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {AccountComponent} from './account/account.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {
  MatButtonModule, MatCardModule, MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule,
  MatRadioModule,
  MatSnackBarModule,
  MatStepperModule
} from '@angular/material';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfileComponent} from './profile/profile.component';
import {UserService} from './services/user.service';
import {AccountService} from './services/account.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, FooterComponent,
    HeaderComponent, AccountComponent, NotFoundComponent, ProfileComponent],
  providers: [AuthService , UserService , AccountService],
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
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class PublicModule {
}
