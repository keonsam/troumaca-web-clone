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
import { AccessRoleFormComponent } from "./access-role-form/access.role.form.component";
import { accessRoleResolveProvider } from "./access.role.resolve.provider";
import {AccessRoleListComponent} from './access-role-list/access.role.list.component';
import {PermissionEditComponent} from './permissions/permission-edit/permission.edit.component';
import {PermissionListComponent} from './permissions/permission-list/permission.list.component';
import {PermissionCreationComponent} from './permissions/permission-creation/permission.creation.component';
import {ResourceListComponent} from './resources/resource-list/resource.list.component';
import {ResourceCreationComponent} from './resources/resource-creation/resource.creation.component';
import {ResourceEditComponent} from './resources/resource-edit/resource.edit.component';
import {ResourceTypeCreationComponent} from './resource-types/resorce.type.creation/resource.type.creation.component';
import {ResourceTypeEditComponent} from './resource-types/resource.type.edit/resource.type.edit.component';
import {ResourceTypeListComponent} from './resource-types/resource.type.list/resource.type.list.component';
import {AccessRoleTypeCreationComponent} from './access-role-types/access-role-type-creation/access.role.type.creation.component';
import {AccessRoleTypeEditComponent} from './access-role-types/access-role-type-edit/access.role.type.edit.component';
import {AccessRoleTypeListComponent} from './access-role-types/access-role-type-list/access.role.type.list.component';
import {accessRoleServiceProvider} from './access.role.service.provider';

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
    PagingModule
  ],
  declarations: [
    AccessRoleComponent,
    AccessRoleFormComponent,
    AccessRoleListComponent,
    PermissionEditComponent,
    PermissionListComponent,
    PermissionCreationComponent,
    AccessRoleTopMenuComponent,
    ResourceListComponent,
    ResourceCreationComponent,
    ResourceEditComponent,
    ResourceTypeCreationComponent,
    ResourceTypeEditComponent,
    ResourceTypeListComponent,
    AccessRoleTypeCreationComponent,
    AccessRoleTypeEditComponent,
    AccessRoleTypeListComponent,
  ],
  providers: [accessRoleServiceProvider, accessRoleResolveProvider],
  exports: [
    // AccessRoleComponent,
    // AccessRoleCreationComponent,
    // AccessRoleEditComponent,
    // AccessRoleListComponent,
    // PermissionEditComponent,
    // PermissionListComponent,
    // PermissionCreationComponent,
    // ResourceEditComponent,
    // ResourceCreationComponent,
    // ResourceListComponent,
    // ResourceTypeCreationComponent,
    // ResourceTypeEditComponent,
    // ResourceTypeListComponent,
    // AccessRoleTypeCreationComponent,
    // AccessRoleTypeEditComponent,
    // AccessRoleTypeListComponent,
    // AccessRoleTopMenuComponent
  ]
})
export class AccessRoleModule {}
