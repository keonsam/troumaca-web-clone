import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AccessRoleComponent} from './access.role.component';
import { AccessRoleFormComponent } from './access-role-form/access.role.form.component';
import {AccessRoleListComponent} from './access-role-list/access.role.list.component';

import {PermissionFormComponent} from './permissions/permission-form/permission.form.component';
import {PermissionListComponent} from './permissions/permission-list/permission.list.component';

import {ResourceListComponent} from './resources/resource-list/resource.list.component';
import { ResourceFormComponent } from './resources/resource-form/resource.form.component';

import {ResourceTypeListComponent} from './resource-types/resource.type.list/resource.type.list.component';
import { ResourceTypeFormComponent} from './resource-types/resource.type.form/resource.type.form.component';
import { ResourceTypeResolve } from './resource-types/resource.type.resolve';

import { AccessRoleTypeFormComponent } from './access-role-types/access-role-type-form/access.role.type.form.component';
import {AccessRoleTypeListComponent} from './access-role-types/access-role-type-list/access.role.type.list.component';

import {AccessRoleResolve} from './access.role.resolve';
import {AccessRoleTypeResolve} from './access.role.type.resolve';
import {PermissionResolve} from './permissions/permission.resolve';
import {ResourceResolve} from './resources/resource.resolve';


const routes: Routes = [
  { path: '', component: AccessRoleComponent, children: [
      { path: '', redirectTo: '/access-roles/listing', pathMatch: 'full' },
      { path: 'listing', component: AccessRoleListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'create', component: AccessRoleFormComponent, data: {menuName: 'access-role-menu'} },
      { path: ':accessRoleId/edit', component: AccessRoleFormComponent,
        resolve: { accessRoleRes: AccessRoleResolve }, data: {menuName: 'access-role-menu'} },
      { path: 'permissions', component: PermissionListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'permissions/create', component: PermissionFormComponent, data: {menuName: 'access-role-menu'} },
      { path: 'permissions/:permissionId/edit', component: PermissionFormComponent,
        resolve: { permission: PermissionResolve}, data: {menuName: 'access-role-menu'} },
      { path: 'resources', component: ResourceListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resources/create', component: ResourceFormComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resources/:resourceId/edit', component: ResourceFormComponent,
        resolve: {resource: ResourceResolve}, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types', component: ResourceTypeListComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types/create', component: ResourceTypeFormComponent, data: {menuName: 'access-role-menu'} },
      { path: 'resource-types/:resourceTypeId/edit', component: ResourceTypeFormComponent,
        resolve: {resourceType: ResourceTypeResolve}, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types/create', component: AccessRoleTypeFormComponent, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types/:accessRoleTypeId/edit', component: AccessRoleTypeFormComponent,
        resolve: {accessRoleType: AccessRoleTypeResolve}, data: {menuName: 'access-role-menu'} },
      { path: 'access-role-types', component: AccessRoleTypeListComponent, data: {menuName: 'access-role-menu'} }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoleRoutingModule { }

