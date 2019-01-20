import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {appRoutingProviders} from './app.routing';
import {UUIDGenerator} from '../uuid.generator';
import {AppConfig} from '../app.config';

import {AdapterModule} from '../adapter/adapter.module';
import {PageNotFoundModule} from './page-not-found/page.not.found.module';

import {sessionInterceptorProvider} from '../client/session.interceptor.provider';
import {AppRoutingModule} from './app.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SessionModule} from '../session/session.module';
import { FrontHomeModule } from '../front-home/front-home.module';
import { ClientModule } from '../client/client.module';
import { MenuModule } from '../menu/menu.module';
import { MaterialModule } from './material.module';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdapterModule,
    PageNotFoundModule,
    SessionModule,
    ClientModule,
    FrontHomeModule,
    MenuModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator},
    sessionInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
