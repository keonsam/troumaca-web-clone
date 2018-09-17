import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BillingDetailsComponent} from "./billing-details.component";
import {BillingDetailsRoutingModule} from "./billing-details.routing.module";

@NgModule({
  imports: [
    CommonModule,
    BillingDetailsRoutingModule
  ],
  declarations: [
    BillingDetailsComponent
  ],
  providers: [],
  exports: []
})

export class BillingDetailsModule { }
