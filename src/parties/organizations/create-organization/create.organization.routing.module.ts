import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateOrganizationComponent} from "./create.organization.component";

export const routes: Routes = [
  { path: '', component: CreateOrganizationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateOrganizationRoutingModule { }
