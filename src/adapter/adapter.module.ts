import {NgModule} from '@angular/core';
import {leftMenuRepositoryProvider, menuRepositoryProvider} from "./menu/menu.repository.adapter.provider";
import {accountRepositoryProvider} from "./account/account.repository.adapter.provider";
import {reportRepositoryProvider} from "./report/report.repository.adapter.provider";
import {signUpRepositoryProvider} from "./sign-up/sign.up.repository.adapter.provider";
import {signInRepositoryProvider} from "./sign-in/sign.in.repository.adapter.provider";
import {forgotPasswordRepositoryProvider} from "./forgot-password/forgot.password.repository.adapter.provider";
import {organizationRepositoryProvider, personRepositoryProvider, assetPersonRepositoryProvider} from "./party/party.repository.adapter.provider";
import {securityRepositoryProvider} from "./security/security.repository.provider";
import {authenticationRepositoryProvider} from "./login/login.repository.adapter.provider";
import {changePasswordRepositoryProvider} from "./change-password/change.password.repository.adapter.provider";
import {sessionRepositoryProvider} from "./session/session.repository.adapter.provider";
import {activityRepositoryProvider} from "./activity/activity.repository.adapter.provider";
import {requestRepositoryProvider} from "./request/request.repository.adapter.provider";
import {assetSiteRepositoryProvider, siteRepositoryProvider} from "./site/site.repository.adapter.provider";
import {workOrderRepositoryProvider} from "./work-order/work.order.repository.adapter.provider";
import {assetRepositoryProvider} from "./assets/asset.repository.adapter.provider";
import {authGuardServiceProvider} from "./auth-guard/auth.guard.repository.adapter.provider";
import {goodsRepositoryProvider} from "./goods/goods.repository.adapter.provider";
import {assetTypeRepositoryProvider} from "./asset-types/asset.repository.adapter.provider";
import {attributeRepositoryProvider} from "./attributes/attributes.repository.adapter.provider";
import {assetTypeClassRepositoryProvider} from "./asset-type-classes/asset.type.classes.adapter.provider";
import {unitOfMeasureRepositoryProvider} from "./unit-of-measures/unit.of.measure.repository.adapter.provider";

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    menuRepositoryProvider,
    accountRepositoryProvider,
    reportRepositoryProvider,
    signUpRepositoryProvider,
    leftMenuRepositoryProvider,
    signInRepositoryProvider,
    forgotPasswordRepositoryProvider,
    organizationRepositoryProvider,
    personRepositoryProvider,
    securityRepositoryProvider,
    authenticationRepositoryProvider,
    changePasswordRepositoryProvider,
    sessionRepositoryProvider,
    activityRepositoryProvider,
    requestRepositoryProvider,
    siteRepositoryProvider,
    assetSiteRepositoryProvider,
    workOrderRepositoryProvider,
    assetRepositoryProvider,
    authGuardServiceProvider,
    goodsRepositoryProvider,
    assetTypeRepositoryProvider,
    attributeRepositoryProvider,
    assetTypeClassRepositoryProvider,
    unitOfMeasureRepositoryProvider,
    assetPersonRepositoryProvider
  ]
})
export class AdapterModule { }