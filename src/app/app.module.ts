import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
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
import {EventSubjectModule} from "./event/event.module";
import {EventModule} from "../event/event.module";
import {ActivityModule} from "../activity/activity.module";
import {AssetTypesModule} from "../asset-types/asset.types.module";
import {RequestModule} from "../request/request.module";
import {WorkOrderModule} from "../work-order/work.order.module";
import {authGuardProvider} from "../auth-guard/auth.guard.provider";
import {GoodsModule} from "../goods/goods.module";
import {AssetsModule} from "../assets/assets.module";


@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
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
    EventSubjectModule,
    EventModule,
    ActivityModule,
    AssetTypesModule,
    RequestModule,
    WorkOrderModule,
    AssetsModule,
    GoodsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    appRoutingProviders,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: AppConfig, useClass: AppConfig},
    {provide: UUIDGenerator, useClass: UUIDGenerator},
    authGuardProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
