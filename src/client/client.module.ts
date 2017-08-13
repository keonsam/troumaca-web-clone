import {NgModule} from '@angular/core';
import {menuClientProvider} from "./menu/menu.client.provider";
import {authenticationClientProvider} from "./authentication/authentication.client.provider";
import {reportClientProvider} from "./report/report.client.provider";
import {accountClientProvider} from "./account/account.client.provider";
import {logoutClientProvider} from "./logout/logout.client.provider";
import {signUpClientProvider} from "./sign-up/sign.up.client.provider";
import {organizationClientProvider} from "./party/organization.client.provider";
import {personClientProvider} from "./party/person.client.provider";
import {securityClientProvider} from "./security/security.client.provider";
import {sessionClientProvider} from "./session/session.client.provider";
import {assetTypeClientProvider} from "client/asset-type/asset.type.client.provider";
import {activityClientProvider} from "./activity/activity.client.provider";
import {workOrderClientProvider} from "./work-order/work.order.client.provider";
import {requestClientProvider} from "./request/request.client.provider";
import {siteClientProvider} from "./site/site.client.provider";
import {assetClientProvider} from "./asset/asset.client.provider";

@NgModule({
  imports:      [],
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
    assetTypeClientProvider,
    activityClientProvider,
    workOrderClientProvider,
    requestClientProvider,
    siteClientProvider,
    assetClientProvider
  ]
})
export class ClientModule { }