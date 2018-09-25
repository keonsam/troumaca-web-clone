import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BillingDetailsComponent} from "./billing-details.component";
import {BillingDetailsRoutingModule} from "./billing-details.routing.module";
import { BillingModalModule } from "./billing-modal/billing-modal.module";
import {MenuModule} from "../menu/menu.module";
import {billingDetailsServiceProvider} from "./billing-details.service.provider";
import {DeleteModalModule} from "../delete-modal/delete.modal.module";

@NgModule({
  imports: [
    CommonModule,
    BillingDetailsRoutingModule,
    BillingModalModule,
    MenuModule,
    DeleteModalModule
  ],
  declarations: [
    BillingDetailsComponent
  ],
  providers: [billingDetailsServiceProvider],
  exports: []
})

export class BillingDetailsModule { }
