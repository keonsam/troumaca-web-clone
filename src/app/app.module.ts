import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// App Component
import {AppComponent} from './app.component';
import {appRoutingProviders} from './app.routing';
import {UUIDGenerator} from '../uuid.generator';
import {AppConfig} from '../app.config';

// Other Components
import {HomeModule} from '../home/home.module';
import {MenuModule} from '../menu/menu.module';
import {ClientModule} from '../client/client.module';
import {AdapterModule} from '../adapter/adapter.module';
import {PageNotFoundModule} from './page-not-found/page.not.found.module';
import {EventSubjectModule} from './event/event.module';
import {EventModule} from '../event/event.module';
import {AssetTypesModule} from '../asset-types/asset.type.module';

// auth-guards
import {authGuardProvider} from '../auth-guard/auth.guard.provider';
import {unAuthGuardProvider} from '../auth-guard/unAuth.guard.provider';
import {profileAuthGuardProvider} from '../auth-guard/profile-auth.guard.provider';

import {sessionInterceptorProvider} from '../client/session.interceptor.provider';
import {AssetModule} from '../assets/asset.module';
import {AppRoutingModule} from './app.routing.module';
import {AttributeModule} from '../attributes/attribute.module';
import {AssetTypeClassModule} from '../asset-type-classes/asset.type.class.module';
import {SiteModule} from '../site/site.module';
import {Ng2CompleterModule} from 'ng2-completer';
import {FormsModule} from '@angular/forms';
import {PartyModule} from '../parties/party.module';
import {ContractModule} from '../contracts/contract.module';
import {QuoteModule} from '../quotes/quote.module';
import {ShipmentModule} from '../shipments/shipment.module';
import {AuthenticationModule} from '../authentication/authentication.module';
import {SessionModule} from '../session/session.module';
import {AccessRoleModule} from '../access-roles/access.role.module';

// Depreciation
import {DepreciationModule} from '../depreciation/depreciation.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
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
    SessionModule,
    AccessRoleModule,
    DepreciationModule
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
    profileAuthGuardProvider,
    sessionInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
