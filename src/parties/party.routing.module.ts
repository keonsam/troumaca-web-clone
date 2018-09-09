import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PartyComponent} from './party.component';
import {OrganizationCompanyComponent} from './organizations/organization-company/organization.company.component';
import {OrganizationListComponent} from './organizations/organization-list/organization.list.component';
import {UserListComponent} from './users/user-list/user.list.component';
import { UserFormComponent } from './users/user-form/user.form.component';
import {UserMeComponent} from './users/user-me/user.me.component';
import {CreateAccountComponent} from './create-profile/create.profile.component';
import { OrganizationFormComponent } from './organizations/organization-form/organization.form.component';
import {OrganizationResolve} from './organizations/organization.resolve';
import {UserResolve} from './users/user.resolve';

export const routes: Routes = [
  { path: '', component: PartyComponent, children: [
      { path: '', redirectTo: 'parties/organizations/listing', pathMatch: 'full' },
      { path: 'organizations/company', component: OrganizationCompanyComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/listing', component: OrganizationListComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/create', component: OrganizationFormComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/:partyId/edit', component: OrganizationFormComponent,
        resolve: {organization: OrganizationResolve}, data: {menuName: 'organizations-menu'} },
      { path: 'users', component: UserListComponent, data: {menuName: 'users-menu'} },
      { path: 'users/create', component: UserFormComponent, data: {menuName: 'users-menu'} },
      { path: 'users/:partyId/edit', component: UserFormComponent,
        resolve: {userResponse: UserResolve}, data: {menuName: 'users-menu'} },
      { path: 'users/profile', component: UserMeComponent, resolve: {userResponse: UserResolve}, data: {menuName: 'users-menu'}},
      { path: 'create-profile', component: CreateAccountComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PartyRoutingModule { }
