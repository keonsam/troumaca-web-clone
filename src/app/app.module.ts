import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {appRoutingProviders} from './app.routing';
import {UUIDGenerator} from '../uuid.generator';
import {AppConfig} from '../app.config';

import {HomeModule} from '../home/home.module';
import {MenuModule} from '../menu/menu.module';
import {ClientModule} from '../client/client.module';
import {AdapterModule} from '../adapter/adapter.module';
import {PageNotFoundModule} from './page-not-found/page.not.found.module';
import {EventSubjectModule} from './event/event.module';
import {EventModule} from '../event/event.module';

import {authGuardProvider} from '../auth-guard/auth.guard.provider';
import {unAuthGuardProvider} from '../auth-guard/unAuth.guard.provider';

import {sessionInterceptorProvider} from '../client/session.interceptor.provider';
import {AppRoutingModule} from './app.routing.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SessionModule} from '../session/session.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MenuModule,
    HomeModule,
    ClientModule,
    AdapterModule,
    PageNotFoundModule,
    EventSubjectModule,
    EventModule,
    AppRoutingModule,
    SessionModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator},
    authGuardProvider,
    unAuthGuardProvider,
    sessionInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
