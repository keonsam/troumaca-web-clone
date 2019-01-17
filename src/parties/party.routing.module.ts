import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PartyComponent} from './party.component';
import {OrganizationCompanyComponent} from './organizations/organization-company/organization.company.component';
import {OrganizationListComponent} from './organizations/organization-list/organization.list.component';
import {UserListComponent} from './users/user-list/user.list.component';
import { UserFormComponent } from './users/user-form/user.form.component';
import {UserMeComponent} from './users/user-me/user.me.component';
import { OrganizationFormComponent } from './organizations/organization-form/organization.form.component';
import {OrganizationResolve} from './organizations/organization-form/organization.resolve';
import {UserResolve} from './users/user.resolve';
import {AuthGuard} from '../auth-guard/auth.guard';
import {OrganizationsResolve} from './organizations/organization-list/organizations.resolve';
import {OrganizationCompanyResolve} from './organizations/organization-company/organization.company.resolve';
import {ContactInfoResolve} from './contact-info/contact.info.resolve';
import {AddressResolve} from './address/address.resolve';
import {UsersResolve} from './users/user-list/users.resolve';

export const routes: Routes = [
  { path: '', component: PartyComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: '/parties/organizations/listing', pathMatch: 'full' },
      {
        path: 'organization/profile', component: OrganizationCompanyComponent,
        resolve: {
          organizationCompany: OrganizationCompanyResolve,
          contactInfo: ContactInfoResolve,
          address: AddressResolve
        }
      },
      { path: 'organizations/listing', component: OrganizationListComponent, resolve: {organizations: OrganizationsResolve} },
      { path: 'organizations/create', component: OrganizationFormComponent },
      { path: 'organizations/:partyId/edit', component: OrganizationFormComponent, resolve: {organization: OrganizationResolve} },
      { path: 'users/listing', component: UserListComponent, resolve: { users: UsersResolve } },
      { path: 'users/create', component: UserFormComponent },
      { path: 'users/:partyId/edit', component: UserFormComponent, resolve: {user: UserResolve} },
      { path: 'user/profile', component: UserMeComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PartyRoutingModule { }
