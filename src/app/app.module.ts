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
import {AccountModule} from "../account/account.module";
import {ReportModule} from "../report/report.module";
import {SignUpModule} from "../sign-up/sign.up.module";
import {LogoutModule} from "../logout/logout.module";
import {PageNotFoundModule} from "./page-not-found/page.not.found.module";
import {EventSubjectModule} from "./event/event.module";
import {EventModule} from "../event/event.module";
import {ActivityModule} from "../activity/activity.module";
import {AssetTypesModule} from "../asset-types/asset.type.module";
import {RequestModule} from "../request/request.module";
import {WorkOrderModule} from "../work-order/work.order.module";
import {authGuardProvider} from "../auth-guard/auth.guard.provider";
import {GoodsModule} from "../goods/goods.module";
import {AssetModule} from "../assets/asset.module";
import {AppRoutingModule} from "./app.routing.module";
import {AttributeModule} from "../attributes/attribute.module";
import {AssetTypeClassModule} from "../asset-type-classes/asset.type.class.module";
import {SiteModule} from "../site/site.module";
import {Ng2CompleterModule} from "ng2-completer";
import {FormsModule} from "@angular/forms";
import {PartyModule} from "../parties/party.module";
import {ContractModule} from "../contracts/contract.module";
import {QuoteModule} from "../quotes/quote.module";
import {ShipmentModule} from "../shipments/shipment.module";
import {AuthenticationModule} from "../authentication/authentication.module";
import {SessionModule} from "../session/session.module";


@NgModule({
  imports: [
    BrowserModule,
    Ng2CompleterModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    MenuModule,
    // routing,
    HomeModule,
    PartyModule,
    ClientModule,
    AdapterModule,
    AuthenticationModule,
    // AccountModule,
    // ReportModule,
    // SignUpModule,
    // LogoutModule,
    PageNotFoundModule,
    EventSubjectModule,
    EventModule,
    // ActivityModule,
    AssetTypesModule,
    // RequestModule,
    // WorkOrderModule,
    AssetModule,
    // GoodsModule,
    AttributeModule,
    AssetTypeClassModule,
    SiteModule,
    ContractModule,
    QuoteModule,
    AppRoutingModule,
    ShipmentModule,
    SessionModule
  ],
  declarations: [
    AppComponent,
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
