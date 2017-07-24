import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// App Component
import {AppComponent} from './app.component';
import {routing, appRoutingProviders} from "./app.routing";
import {UUIDGenerator} from "../uuid.generator";
import {AppConfig} from "../app.config";

// Other Components
import {HomeModule} from '../home/home.module';
import {MenuModule} from "../menu/menu.module";
import {ClientModule} from "../client/client.module";
import {AdapterModule} from "../adapter/adapter.module";
import {LoginModule} from "../login/login.module";
import {AccountModule} from "../account/account.module";
import {ReportModule} from "../report/report.module";
import {SignUpModule} from "../sign-up/sign.up.module";
import {LogoutModule} from "../logout/logout.module";
import {PageNotFoundModule} from "./page-not-found/page.not.found.module";
import {EventModule} from "./event/event.module";


@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    MenuModule,
    routing,
    HomeModule,
    ClientModule,
    AdapterModule,
    LoginModule,
    AccountModule,
    ReportModule,
    SignUpModule,
    LogoutModule,
    PageNotFoundModule,
    EventModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
