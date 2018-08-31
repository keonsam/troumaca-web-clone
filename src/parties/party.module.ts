import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PartyRoutingModule } from './party.routing.module';
import {PartyComponent} from './party.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {PagingModule} from '../paging/paging.module';

import {OrganizationListComponent} from './organizations/organization-list/organization.list.component';
import { OrganizationFormComponent } from './organizations/organization-form/organization.form.component';
import {OrganizationCompanyComponent} from './organizations/organization-company/organization.company.component';
import {OrganizationTopMenuComponent} from './organizations/organization-top-menu/organization.top.menu.component';

import { UserFormComponent } from "./users/user-form/user.form.component";
import {UserListComponent} from './users/user-list/user.list.component';
import {UserTopMenuComponent} from './users/user-top-menu/user.top.menu.component';

import {UserMeComponent} from './users/user-me/user.me.component';
import {CreateAccountComponent} from './create-profile/create.profile.component';
import {PartyEventService} from './party.event.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import {Ng2CompleterModule} from 'ng2-completer';
import { Select2Module } from 'ng2-select2';

// providers
import {partyServiceProvider} from './party.service.provider';
import { organizationResolveProvider } from './organizations/organization.resolve.provider';
import { userResolveProvider } from "./users/user.resolve.provider";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule,
    Ng2CompleterModule,
    ImageCropperModule,
    Select2Module,
    PartyRoutingModule
  ],
  declarations: [
    PartyComponent,
    OrganizationListComponent,
    OrganizationFormComponent,
    OrganizationCompanyComponent,
    OrganizationTopMenuComponent,
    UserTopMenuComponent,
    UserFormComponent,
    UserListComponent,
    UserMeComponent,
    CreateAccountComponent,
  ],
  providers: [partyServiceProvider, PartyEventService,
    organizationResolveProvider, userResolveProvider],
  exports: []
})
export class PartyModule {}
