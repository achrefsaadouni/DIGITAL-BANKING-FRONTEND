import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PublicModule} from './public/public.module';
import {PrivateModule} from './private/private.module';
import {RouteModuleModule} from './route-module/route-module.module';
import {RouterModule} from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    PublicModule,
    PrivateModule,
    RouteModuleModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
