import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrganizationFormComponent} from './organization.form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {organizationServiceProvider} from "../organization.service.provider";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrganizationFormComponent,
  ],
  providers: [organizationServiceProvider],
  exports: [OrganizationFormComponent],
})
export class OrganizationFormModule { }
