import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Ng2CompleterModule} from 'ng2-completer';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccessRoleRoutingModule } from './access.role.routing.module';
import {AccessRoleComponent} from './access.role.component';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AccessRoleTopMenuComponent} from './access-role-top-menu/access.role.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import { AccessRoleFormComponent } from './access-role-form/access.role.form.component';
import { accessRoleResolveProvider } from './access.role.resolve.provider';
import {AccessRoleListComponent} from './access-role-list/access.role.list.component';

import { PermissionFormComponent } from './permissions/permission-form/permission.form.component';
import {PermissionListComponent} from './permissions/permission-list/permission.list.component';
import {ResourceListComponent} from './resources/resource-list/resource.list.component';
import { ResourceFormComponent } from "./resources/resource-form/resource.form.component";
import {ResourceTypeListComponent} from './resource-types/resource.type.list/resource.type.list.component';
import {AccessRoleTypeListComponent} from './access-role-types/access-role-type-list/access.role.type.list.component';
import {accessRoleServiceProvider} from './access.role.service.provider';
import { accessRoleTypeResolveProvider } from './access.role.type.resolve.provider';
import {AccessRoleTypeFormComponent} from './access-role-types/access-role-type-form/access.role.type.form.component';
import { permissionResolveProvider } from './permissions/permission.resolve.provider';
import { ResourceTypeFormComponent } from './resource-types/resource.type.form/resource.type.form.component';
import { resourceTypeResolveProvider} from './resource-types/resource.type.resolve.provider';
import { resourceResolveProvider } from "./resources/resource.resolve.provider";
import {DeleteModalModule} from "../delete-modal/delete.modal.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    AccessRoleRoutingModule,
    MenuModule,
    SearchModule,
    PagingModule,
    DeleteModalModule
  ],
  declarations: [
    AccessRoleComponent,
    AccessRoleFormComponent,
    AccessRoleListComponent,
    PermissionFormComponent,
    PermissionListComponent,
    AccessRoleTopMenuComponent,
    ResourceListComponent,
    ResourceFormComponent,
    ResourceTypeFormComponent,
    ResourceTypeListComponent,
    AccessRoleTypeFormComponent,
    AccessRoleTypeListComponent,
  ],
  providers: [accessRoleServiceProvider, accessRoleResolveProvider, accessRoleTypeResolveProvider,
    permissionResolveProvider,
    resourceTypeResolveProvider, resourceResolveProvider],
  exports: [
  ]
})
export class AccessRoleModule {}
