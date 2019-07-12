import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import {PublicModule} from '../public/public.module';



@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    PublicModule
  ]
})
export class PrivateModule { }
