import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {AccessRoleComponent} from "./access.role.component";
import {AccessRoleService} from "./access.role.service";
import {AccessRoleRepository} from "./access.role.repository";
import {accessRoleRouting} from "./access.role.routing";
import {RouterModule} from "@angular/router";
import {MenuModule} from "../menu/menu.module";
import {AccessRoleTopMenuComponent} from "./access-role-top-menu/access.role.top.menu.component";
import {SearchModule} from "../search/search.module";
import {PagingModule} from "../paging/paging.module";
import {AccessRoleCreationComponent} from "./access-role-creation/access.role.creation.component";
import {AccessRoleEditComponent} from "./access-role-edit/access.role.edit.component";
import {AccessRoleListComponent} from "./access-role-list/access.role.list.component";
import {PermissionEditComponent} from "./permissions/permission-edit/permission.edit.component";
import {PermissionListComponent} from "./permissions/permission-list/permission.list.component";
import {PermissionCreationComponent} from "./permissions/permission-creation/permission.creation.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    // FormsModule,
    RouterModule,
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
    AccessRoleTopMenuComponent
  ],
  providers: [{
    provide: AccessRoleService,
    useFactory(accessRoleRepository:AccessRoleRepository) {
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
    AccessRoleTopMenuComponent
  ]
})
export class AccessRoleModule {}
