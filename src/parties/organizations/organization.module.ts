import {NgModule} from '@angular/core';
import {OrganizationCreateComponent} from './organization-create/organization.create.component';
import {OrganizationCompanyComponent} from './organization-company/organization.company.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app/material.module';
import {PhotoModule} from '../photo/photo.module';
import {organizationServiceProvider} from './organization.service.provider';
import {organizationCompanyResolveProvider} from './organization-company/organization.company.resolve.provider';
import {organizationRepositoryProvider} from '../../adapter/party/organization/organization.repository.adapter.provider';
import {organizationClientProvider} from '../../client/party/organization/organization.client.provider';
import {OrganizationComponent} from './organization.component';
import {PartyModule} from '../party.module';
import {OrganizationRoutingModule} from './organization.routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PhotoModule,
    PartyModule,
    OrganizationRoutingModule
  ],
  declarations: [
    OrganizationCreateComponent,
    OrganizationCompanyComponent,
    OrganizationComponent
  ],
  exports: [],
  providers: [
    organizationServiceProvider,
    organizationCompanyResolveProvider,
    organizationRepositoryProvider,
    organizationClientProvider,
  ]
})
export class OrganizationModule { }

