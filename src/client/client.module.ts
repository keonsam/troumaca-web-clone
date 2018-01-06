import {NgModule} from '@angular/core';
import {menuClientProvider} from "./menus/menu.client.provider";
import {authenticationClientProvider} from "./credentials/authentication.client.provider";
import {reportClientProvider} from "./reports/report.client.provider";
import {accountClientProvider} from "./accounts/account.client.provider";
import {logoutClientProvider} from "./logout/logout.client.provider";
import {signUpClientProvider} from "./sign-up/sign.up.client.provider";
import {organizationClientProvider} from "./parties/organization.client.provider";
import {personClientProvider} from "./parties/person.client.provider";
import {securityClientProvider} from "./security/security.client.provider";
import {sessionClientProvider} from "./sessions/session.client.provider";
import {activityClientProvider} from "./activities/activity.client.provider";
import {workOrderClientProvider} from "./work-orders/work.order.client.provider";
import {requestClientProvider} from "./requests/request.client.provider";
import {siteClientProvider} from "./sites/site.client.provider";
import {assetClientProvider} from "./assets/asset.client.provider";
import {assetTypesClientProvider} from "./asset-types/asset.types.client.provider";
import {attributeClientProvider} from "./attributes/attribute.client.provider";
import {assetTypeClassClientProvider} from "./asset-type-classes/asset.type.class.client.provider";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {unitOfMeasureClientProvider} from "./unit-of-measures/unit.of.measure.client.provider";

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
    organizationClientProvider,
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
    unitOfMeasureClientProvider
  ]
})
export class ClientModule { }