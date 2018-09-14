import {NgModule} from '@angular/core';
import {OrganizationCompanyComponent} from './organization.company.component';
import {CommonModule} from '@angular/common';
import {PhotoModule} from '../../../photo/photo.module';
import {OrganizationFormModule} from "../organization-form/organization.form.module";

@NgModule({
  imports: [
    CommonModule,
    PhotoModule,
    OrganizationFormModule
  ],
  declarations: [
    OrganizationCompanyComponent,
  ],
  exports: [OrganizationCompanyComponent],
})
export class OrganizationCompanyModule { }
