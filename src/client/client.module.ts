import {NgModule} from '@angular/core';
import {menuClientProvider} from './menus/menu.client.provider';
import {authenticationClientProvider} from './credential/authentication.client.provider';
import {reportClientProvider} from './report/report.client.provider';
import {accountClientProvider} from './account/account.client.provider';
import {logoutClientProvider} from './logout/logout.client.provider';
import {signUpClientProvider} from './sign-up/sign.up.client.provider';
import {personClientProvider} from './party/person.client.provider';
import {securityClientProvider} from './security/security.client.provider';
import {sessionClientProvider} from './session/session.client.provider';
import {activityClientProvider} from './activity/activity.client.provider';
import {workOrderClientProvider} from './work-order/work.order.client.provider';
import {requestClientProvider} from './request/request.client.provider';
import {siteClientProvider} from './site/site.client.provider';
import {assetClientProvider} from './asset/asset.client.provider';
import {assetTypesClientProvider} from './asset-type/asset.types.client.provider';
import {attributeClientProvider} from './attribute/attribute.client.provider';
import {assetTypeClassClientProvider} from './asset-type-class/asset.type.class.client.provider';
import {accessRolesClientProvider} from './access-roles/access.roles.client.provider';
import {HttpClientModule} from '@angular/common/http';
// import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {unitOfMeasureClientProvider} from './unit-of-measure/unit.of.measure.client.provider';
import {contractClientProvider} from './contract/contract.client.provider';
import {quoteClientProvider} from './quote/quote.client.provider';
import {shipmentClientProvider} from './shipment/shipment.client.provider';
import {sessionInterceptorProvider} from './session.interceptor.provider';
import {clientEventProvider} from './client.event.provider';
import {homeClientProvider} from "./home/home.client.provider";
import {depreciationClientProvider} from "./depreciation/depreciation.client.provider";
import { photoClientProvider } from "./photo/photo.client.provider";
import { userClientProvider } from "./party/user/user.client.provider";
import { organizationClientProvider } from "./party/organization/organization.client.provider";
import { billingDetailsClientProvider } from "./billing-details/billing-details.client.provider";

@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [],
  exports:      [],
  providers: [
    accountClientProvider,
    authenticationClientProvider,
    menuClientProvider,
    logoutClientProvider,
    reportClientProvider,
    signUpClientProvider,
    personClientProvider,
    securityClientProvider,
    sessionClientProvider,
    activityClientProvider,
    workOrderClientProvider,
    requestClientProvider,
    siteClientProvider,
    assetClientProvider,
    assetTypesClientProvider,
    attributeClientProvider,
    assetTypeClassClientProvider,
    unitOfMeasureClientProvider,
    contractClientProvider,
    quoteClientProvider,
    shipmentClientProvider,
    clientEventProvider,
    sessionInterceptorProvider,
    accessRolesClientProvider,
    homeClientProvider,
    depreciationClientProvider,
    photoClientProvider,
    userClientProvider,
    organizationClientProvider,
    billingDetailsClientProvider
  ]
})
export class ClientModule { }

// {
//   provide: HTTP_INTERCEPTORS,
//     useClass: SessionInterceptor,
//   multi: true
// }

// sessionInterceptorProvider
