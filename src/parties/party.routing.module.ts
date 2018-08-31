import {Routes, RouterModule} from '@angular/router';
import {NgModule} from "@angular/core";
import {PartyComponent} from "./party.component";
import {OrganizationCompanyComponent} from "./organizations/organization-company/organization.company.component";
import {OrganizationListComponent} from "./organizations/organization-list/organization.list.component";
import {OrganizationCreationComponent} from "./organizations/organization-creation/organization.creation.component";
import {OrganizationEditComponent} from "./organizations/organization-edit/organization.edit.component";
import {UserListComponent} from "./users/user-list/user.list.component";
import {UserCreationComponent} from "./users/user-creation/user.creation.component";
import {UserEditComponent} from "./users/user-edit/user.edit.component";
import {UserMeComponent} from "./users/user-me/user.me.component";
import {CreateAccountComponent} from "./create-profile/create.profile.component";

export const routes: Routes = [
  { path: '', component: PartyComponent, children: [
      { path: '', redirectTo: 'parties/organizations/listing', pathMatch: 'full' },
      { path: 'organizations/company', component: OrganizationCompanyComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/listing', component: OrganizationListComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/create', component: OrganizationCreationComponent, data: {menuName: 'organizations-menu'} },
      { path: 'organizations/:partyId/edit', component: OrganizationEditComponent, data: {menuName: 'organizations-menu'} },
      { path: 'users', component: UserListComponent, data: {menuName: 'users-menu'} },
      { path: 'users/create', component: UserCreationComponent, data: {menuName: 'users-menu'} },
      { path: 'users/:partyId/edit', component: UserEditComponent, data: {menuName: 'users-menu'} },
      { path: 'user-me', component: UserMeComponent, data: {menuName: 'users-menu'}},
      { path: 'create-profile', component: CreateAccountComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PartyRoutingModule { }
