import {NgModule} from '@angular/core';
import { menuRepositoryProvider} from './menu/menu.repository.adapter.provider';
import {securityRepositoryProvider} from './security/security.repository.provider';
import {changePasswordRepositoryProvider} from './change-password/change.password.repository.adapter.provider';
import {sessionRepositoryProvider} from './session/session.repository.adapter.provider';
import {siteRepositoryProvider} from './site/site.repository.adapter.provider';
import {assetRepositoryProvider} from './assets/asset.repository.adapter.provider';
import {assetTypeRepositoryProvider} from './asset-types/asset.repository.adapter.provider';
import {attributeRepositoryProvider} from './attributes/attributes.repository.adapter.provider';
import {assetTypeClassRepositoryProvider} from './asset-type-classes/asset.type.classes.adapter.provider';
import {unitOfMeasureRepositoryProvider} from './unit-of-measures/unit.of.measure.repository.adapter.provider';
import {shipmentRepositoryProvider} from './shipment/shipment.repository.adapter.provider';
import {authenticationRepositoryProvider} from './authentication/authentication.repository.adapter.provider';
import {accessRoleRepositoryProvider} from './access-roles/access.role.adapter.provider';
import {depreciationRepositoryProvider} from './depreciation/depreciation.repository.adapter.provider';
import { partyRepositoryProvider } from './party/party.repository.adapter.provider';
import { photoRepositoryProvider } from './photo/photo.repository.adapter.provider';
import { userRepositoryProvider } from './party/user/user.repository.adapter.provider';
import { organizationRepositoryProvider } from './party/organization/organization.repository.adapter.provider';
import {billingDetailsRepositoryProvider} from './billing-details/billing-details.repository.adapter.provider';
import {lobbyRepositoryProvider} from './lobby/lobby.repository.adapter.provider';
import { authGuardServiceProvider } from './auth-guard/auth.guard.repository.adapter.provider';
import {organizationCreateRepositoryProvider} from "./organization-create/organization.create.repository.adapter.provider";

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    menuRepositoryProvider,
    securityRepositoryProvider,
    changePasswordRepositoryProvider,
    sessionRepositoryProvider,
    siteRepositoryProvider,
    assetRepositoryProvider,
    assetTypeRepositoryProvider,
    attributeRepositoryProvider,
    assetTypeClassRepositoryProvider,
    unitOfMeasureRepositoryProvider,
    shipmentRepositoryProvider,
    authenticationRepositoryProvider,
    accessRoleRepositoryProvider,
    partyRepositoryProvider,
    depreciationRepositoryProvider,
    photoRepositoryProvider,
    userRepositoryProvider,
    organizationRepositoryProvider,
    billingDetailsRepositoryProvider,
    lobbyRepositoryProvider,
    authGuardServiceProvider,
    organizationCreateRepositoryProvider
  ]
})
export class AdapterModule { }
