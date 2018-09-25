import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BillingModalComponent} from './billing-modal.component';
import {billingDetailsServiceProvider} from "../billing-details.service.provider";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BillingModalComponent],
  providers: [billingDetailsServiceProvider],
  exports: [
    BillingModalComponent
  ]
})

export class BillingModalModule { }
