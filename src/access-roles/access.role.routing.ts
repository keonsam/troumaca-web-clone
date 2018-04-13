import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AccessRoleComponent} from "./access.role.component";

const accessRoleRoutes: Routes = [
  {path: 'accessRole', component: AccessRoleComponent},
];

export const accessRoleRouting: ModuleWithProviders = RouterModule.forChild(accessRoleRoutes);
