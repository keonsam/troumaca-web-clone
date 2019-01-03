import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {OrganizationCreateComponent} from "./organization.create.component";

export const routes: Routes = [
  { path: '', component: OrganizationCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrganizationCreateRoutingModule { }
