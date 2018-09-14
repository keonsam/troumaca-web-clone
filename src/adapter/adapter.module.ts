import {NgModule} from '@angular/core';
import { menuRepositoryProvider} from './menu/menu.repository.adapter.provider';
import {assetPersonRepositoryProvider} from './party/party.repository.adapter.provider';
import {securityRepositoryProvider} from './security/security.repository.provider';
import {changePasswordRepositoryProvider} from './change-password/change.password.repository.adapter.provider';
import {sessionRepositoryProvider} from './session/session.repository.adapter.provider';
import {assetSiteRepositoryProvider, siteRepositoryProvider} from './site/site.repository.adapter.provider';
import {assetRepositoryProvider} from './assets/asset.repository.adapter.provider';
import {assetTypeRepositoryProvider} from './asset-types/asset.repository.adapter.provider';
import {attributeRepositoryProvider} from './attributes/attributes.repository.adapter.provider';
import {assetTypeClassRepositoryProvider} from './asset-type-classes/asset.type.classes.adapter.provider';
import {unitOfMeasureRepositoryProvider} from './unit-of-measures/unit.of.measure.repository.adapter.provider';
import {quoteRepositoryProvider} from './quote/quote.repository.adapter.provider';
import {shipmentRepositoryProvider} from './shipment/shipment.repository.adapter.provider';
import {authenticationRepositoryProvider} from './authentication/authentication.repository.adapter.provider';
import {accessRoleRepositoryProvider} from './access-roles/access.role.adapter.provider';
import {homeRepositoryProvider} from './home/home.repository.adapter.provider';
import {depreciationRepositoryProvider} from './depreciation/depreciation.repository.adapter.provider';
import { partyRepositoryProvider } from './party/party.repository.adapter.provider';
import { photoRepositoryProvider } from './photo/photo.repository.adapter.provider';
import { userRepositoryProvider } from './party/user/user.repository.adapter.provider';
import { organizationRepositoryProvider } from "./party/organization/organization.repository.adapter.provider";

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
    assetSiteRepositoryProvider,
    assetRepositoryProvider,
    assetTypeRepositoryProvider,
    attributeRepositoryProvider,
    assetTypeClassRepositoryProvider,
    unitOfMeasureRepositoryProvider,
    assetPersonRepositoryProvider,
    quoteRepositoryProvider,
    shipmentRepositoryProvider,
    authenticationRepositoryProvider,
    accessRoleRepositoryProvider,
    homeRepositoryProvider,
    partyRepositoryProvider,
    depreciationRepositoryProvider,
    photoRepositoryProvider,
    userRepositoryProvider,
    organizationRepositoryProvider
  ]
})
export class AdapterModule { }
