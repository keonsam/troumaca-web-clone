import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MenuModule} from "../menu/menu.module";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PagingModule} from "../paging/paging.module";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ContractComponent} from "./contract.component";
import {ContractService} from "./contract.service";
import {ContractRepository} from "./contract.repository";
import {PurchaseOrderComponent} from "./orders/purchase/purchase.order.component";
import {OrderFulfillmentComponent} from "./orders/fulfillment/order.fulfillment.component";
import {OrderListComponent} from "./orders/order.list.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagingModule,
    MenuModule
  ],
  declarations: [
    ContractComponent,
    PurchaseOrderComponent,
    OrderFulfillmentComponent,
    OrderListComponent
  ],
  providers: [{
    provide: ContractService,
    useFactory(contractRepository:ContractRepository) {
      let contractService: ContractService;
      if (!contractService) {
        contractService = new ContractService(contractRepository);
      }
      return contractService;
    },
    deps: [ContractRepository]
  }],
  exports: [
    ContractComponent,
    PurchaseOrderComponent,
    OrderFulfillmentComponent,
    OrderListComponent
  ]
})

export class ContractModule {}