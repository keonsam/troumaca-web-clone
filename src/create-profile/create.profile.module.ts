import {NgModule} from '@angular/core';
import { CreateProfileComponent } from './create.profile.component';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../app/material.module';
import { CreateProfileRoutingModule } from './create.profile.routing.module';
import {UserMeModule} from '../parties/users/user-me/user.me.module';
import {OrganizationCompanyModule} from '../parties/organizations/organization-company/organization.company.module';
import {userResolveProvider} from '../parties/users/user.resolve.provider';
import { Ng2CompleterModule } from 'ng2-completer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {organizationServiceProvider} from '../parties/organizations/organization.service.provider';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CreateProfileRoutingModule,
    UserMeModule,
    OrganizationCompanyModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateProfileComponent
  ],
  providers: [userResolveProvider, organizationServiceProvider],
  exports: []
})

export class CreateProfileModule {}
