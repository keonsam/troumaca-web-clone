import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PartyRoutingModule } from './party.routing.module';
import {PartyComponent} from './party.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';

import {OrganizationListComponent} from './organizations/organization-list/organization.list.component';
import {OrganizationTopMenuComponent} from './organizations/organization-top-menu/organization.top.menu.component';

import { UserFormComponent } from './users/user-form/user.form.component';
import {UserListComponent} from './users/user-list/user.list.component';
import {UserTopMenuComponent} from './users/user-top-menu/user.top.menu.component';

import {PartyEventService} from './party.event.service';

// providers
import {partyServiceProvider} from './party.service.provider';
import { organizationResolveProvider } from './organizations/organization-form/organization.resolve.provider';
import { userResolveProvider } from './users/user.resolve.provider';
import { userServiceProvider } from './users/user.service.provider';
import { organizationServiceProvider } from './organizations/organization.service.provider';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {MaterialModule} from '../app/material.module';
import {ContactInfoComponent} from './contact-info/contact.info.component';
import {OrganizationCompanyComponent} from './organizations/organization-company/organization.company.component';
import {PhotoModule} from './photo/photo.module';
import {AddressComponent} from './address/address.component';
import {UserMeComponent} from './users/user-me/user.me.component';
import {partyRepositoryProvider} from '../adapter/party/party.repository.adapter.provider';
import {partyClientProvider} from '../client/party/party.client.provider';
import {OrganizationFormComponent} from './organizations/organization-form/organization.form.component';
import {userRepositoryProvider} from '../adapter/party/user/user.repository.adapter.provider';
import {userClientProvider} from '../client/party/user/user.client.provider';
import {organizationRepositoryProvider} from '../adapter/party/organization/organization.repository.adapter.provider';
import {organizationClientProvider} from '../client/party/organization/organization.client.provider';
import {organizationsResolveProvider} from './organizations/organization-list/organizations.resolve.provider';
import {organizationCompanyResolveProvider} from './organizations/organization-company/organization.company.resolve.provider';
import {addressResolveProvider} from './address/address.resolve.provider';
import {contactInfoResolveProvider} from './contact-info/contact.info.resolve.provider';
import {usersResolveProvider} from './users/user-list/users.resolve.provider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule,
    PartyRoutingModule,
    DeleteModalModule,
    MaterialModule,
    PhotoModule,
  ],
  declarations: [
    PartyComponent,
    OrganizationListComponent,
    OrganizationTopMenuComponent,
    UserTopMenuComponent,
    UserFormComponent,
    UserListComponent,
    ContactInfoComponent,
    OrganizationCompanyComponent,
    OrganizationFormComponent,
    UserMeComponent,
    AddressComponent
  ],
  providers: [
    partyServiceProvider,
    PartyEventService,
    userResolveProvider,
    usersResolveProvider,
    userServiceProvider,
    userRepositoryProvider,
    userClientProvider,
    organizationServiceProvider,
    organizationResolveProvider,
    organizationsResolveProvider,
    organizationCompanyResolveProvider,
    organizationRepositoryProvider,
    organizationClientProvider,
    partyRepositoryProvider,
    partyClientProvider,
    addressResolveProvider,
    contactInfoResolveProvider
  ],
  exports: []
})
export class PartyModule {}
