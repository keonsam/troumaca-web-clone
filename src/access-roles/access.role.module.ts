import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2CompleterModule} from 'ng2-completer';
import {ReactiveFormsModule} from '@angular/forms';
import {AccessRoleComponent} from './access.role.component';
import {AccessRoleService} from './access.role.service';
import {AccessRoleRepository} from './access.role.repository';
import {accessRoleRouting} from './access.role.routing';
import {RouterModule} from '@angular/router';
import {MenuModule} from '../menu/menu.module';
import {AccessRoleTopMenuComponent} from './access-role-top-menu/access.role.top.menu.component';
import {SearchModule} from '../search/search.module';
import {PagingModule} from '../paging/paging.module';
import {AccessRoleCreationComponent} from './access-role-creation/access.role.creation.component';
import {AccessRoleEditComponent} from './access-role-edit/access.role.edit.component';
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

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    // FormsModule,
    RouterModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    accessRoleRouting,
    MenuModule,
    SearchModule,
    PagingModule
  ],
  declarations: [
    AccessRoleComponent,
    AccessRoleCreationComponent,
    AccessRoleEditComponent,
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
  providers: [{
    provide: AccessRoleService,
    useFactory(accessRoleRepository: AccessRoleRepository) {
      let accessRoleService: AccessRoleService;
      if (!accessRoleService) {
        accessRoleService = new AccessRoleService(accessRoleRepository);
      }
      return accessRoleService;
    },
    deps: [AccessRoleRepository]
  }],
  exports: [
    AccessRoleComponent,
    AccessRoleCreationComponent,
    AccessRoleEditComponent,
    AccessRoleListComponent,
    PermissionEditComponent,
    PermissionListComponent,
    PermissionCreationComponent,
    ResourceEditComponent,
    ResourceCreationComponent,
    ResourceListComponent,
    ResourceTypeCreationComponent,
    ResourceTypeEditComponent,
    ResourceTypeListComponent,
    AccessRoleTypeCreationComponent,
    AccessRoleTypeEditComponent,
    AccessRoleTypeListComponent,
    AccessRoleTopMenuComponent
  ]
})
export class AccessRoleModule {}
