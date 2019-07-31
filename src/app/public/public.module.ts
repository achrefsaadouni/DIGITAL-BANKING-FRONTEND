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
  MatInputModule, MatNativeDateModule, MatOptionModule,
  MatRadioModule, MatSelectModule,
  MatSnackBarModule,
  MatStepperModule
} from '@angular/material';
import {NotFoundComponent} from './not-found/not-found.component';
import {ProfileComponent} from './profile/profile.component';
import { ChooseAccountComponent } from './choose-account/choose-account.component';
import { CompanyAccountComponent } from './company-account/company-account.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {QRCodeModule} from 'angularx-qrcode';
import {AgmCoreModule} from '@agm/core';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent, FooterComponent,
    HeaderComponent, AccountComponent, NotFoundComponent, ProfileComponent, ChooseAccountComponent, CompanyAccountComponent],
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
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    QRCodeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9gQHRog7B76-y6PK28V76L0UZMAEGDAw',
      libraries: ['places']
    })
  ]
})
export class PublicModule {
}
