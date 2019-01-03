import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../app/material.module";
import {OrganizationCreateComponent} from "./organization.create.component";
import {organizationCreateServiceProvider} from "./organization.create.service.provider";
import {OrganizationCreateRoutingModule} from "./organization.create.routing.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrganizationCreateRoutingModule
  ],
  declarations: [
    OrganizationCreateComponent
  ],
  providers: [
    organizationCreateServiceProvider
  ],
  exports: [],
})

export class OrganizationCreateModule { }
