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
import {Ng2CompleterModule} from 'ng2-completer';
import { Select2Module } from 'ng2-select2';

// providers
import {partyServiceProvider} from './party.service.provider';
import { organizationResolveProvider } from './organizations/organization.resolve.provider';
import { userResolveProvider } from './users/user.resolve.provider';
import { userServiceProvider } from './users/user.service.provider';
import { organizationServiceProvider } from './organizations/organization.service.provider';
import { OrganizationFormModule } from './organizations/organization-form/organization.form.module';
import {DeleteModalModule} from '../delete-modal/delete.modal.module';
import {authGuardProvider} from '../auth-guard/auth.guard.provider';
import {MaterialModule} from '../app/material.module';
import {ContactInfoComponent} from './contact-info/contact.info.component';
import {OrganizationCompanyComponent} from './organizations/organization-company/organization.company.component';
import {PhotoModule} from './photo/photo.module';
import {AddressComponent} from './address/address.component';
import {UserMeComponent} from "./users/user-me/user.me.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule,
    Ng2CompleterModule,
    Select2Module,
    PartyRoutingModule,
    OrganizationFormModule,
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
    UserMeComponent,
    AddressComponent
  ],
  providers: [partyServiceProvider, PartyEventService,
    organizationResolveProvider, userResolveProvider, userServiceProvider,
    organizationServiceProvider, authGuardProvider],
  exports: []
})
export class PartyModule {}
