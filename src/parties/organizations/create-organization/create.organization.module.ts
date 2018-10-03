import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateOrganizationComponent} from "./create.organization.component";
import {organizationServiceProvider} from "../organization.service.provider";
import {CreateOrganizationRoutingModule} from "./create.organization.routing.module";
import {Ng2CompleterModule} from "ng2-completer";
import {OrganizationFormModule} from "../organization-form/organization.form.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CreateOrganizationRoutingModule,
    Ng2CompleterModule,
    OrganizationFormModule
  ],
  declarations: [
    CreateOrganizationComponent
  ],
  providers: [
    organizationServiceProvider
  ],
  exports: []
})
export class CreateOrganizationModule { }
