import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccessRoleComponent} from './access.role.component';
import { AccessRoleFormComponent } from "./access-role-form/access.role.form.component";
import {AccessRoleListComponent} from './access-role-list/access.role.list.component';
import {PermissionListComponent} from './permissions/permission-list/permission.list.component';
import {PermissionCreationComponent} from './permissions/permission-creation/permission.creation.component';
import {PermissionEditComponent} from './permissions/permission-edit/permission.edit.component';
import {ResourceListComponent} from './resources/resource-list/resource.list.component';
import {ResourceCreationComponent} from './resources/resource-creation/resource.creation.component';
import {ResourceEditComponent} from './resources/resource-edit/resource.edit.component';
import {ResourceTypeListComponent} from './resource-types/resource.type.list/resource.type.list.component';
import {ResourceTypeCreationComponent} from './resource-types/resorce.type.creation/resource.type.creation.component';
import {ResourceTypeEditComponent} from './resource-types/resource.type.edit/resource.type.edit.component';
import {AccessRoleTypeCreationComponent} from './access-role-types/access-role-type-creation/access.role.type.creation.component';
import {AccessRoleTypeEditComponent} from './access-role-types/access-role-type-edit/access.role.type.edit.component';
import {AccessRoleTypeListComponent} from './access-role-types/access-role-type-list/access.role.type.list.component';
import {AccessRoleResolve} from "./access.role.resolve";

const routes: Routes = [
  { path: '', component: AccessRoleComponent, children: [
      { path: '', redirectTo: 'access-roles/listing', pathMatch: 'full' },
      { path: 'listing', component: AccessRoleListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'create', component: AccessRoleFormComponent, data: {menuName: 'access-role-menu'} },
      { path: ':accessRoleId/edit', component: AccessRoleFormComponent,
        resolve: { accessRoleRes: AccessRoleResolve }, data: {menuName: 'access-role-menu'} },
      { path: 'permissions', component: PermissionListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'permissions/create', component: PermissionCreationComponent, data: {menuName: 'access-role-menu'} },
      { path: 'permissions/:permissionId/edit', component: PermissionEditComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resources', component: ResourceListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resources/create', component: ResourceCreationComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resources/:resourceId/edit', component: ResourceEditComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types', component: ResourceTypeListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types/create', component: ResourceTypeCreationComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types/:resourceTypeId/edit', component: ResourceTypeEditComponent, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types/create', component: AccessRoleTypeCreationComponent, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types/:accessRoleTypeId/edit', component: AccessRoleTypeEditComponent, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types', component: AccessRoleTypeListComponent, data: {menuName: 'access-role-menu'} }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoleRoutingModule { }

