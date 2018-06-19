import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuModule} from '../menu/menu.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PagingModule} from '../paging/paging.module';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ContractComponent} from './contract.component';
import {ContractService} from './contract.service';
import {ContractRepository} from './contract.repository';
import {PurchaseOrderListComponent} from './orders/purchases/purchase.order.list.component';
import {OrderFulfillmentListComponent} from './orders/fulfillments/order.fulfillment.list.component';
import {OrderListComponent} from './orders/order.list.component';
import {SaleOrderListComponent} from './orders/sales/sale.order.list.component';
import {ContractListComponent} from './contract-list/contract.list.component';
import {OrderInvoiceListComponent} from './orders/invoices/order.invoice.list.component';
import {SaleOrderMenuComponent} from './orders/sales/sale-order-menu/sale.order.menu.component';

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
    PurchaseOrderListComponent,
    OrderFulfillmentListComponent,
    OrderListComponent,
    SaleOrderListComponent,
    ContractListComponent,
    OrderInvoiceListComponent,
    SaleOrderMenuComponent
  ],
  providers: [{
    provide: ContractService,
    useFactory(contractRepository: ContractRepository) {
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
    PurchaseOrderListComponent,
    OrderFulfillmentListComponent,
    OrderListComponent,
    SaleOrderListComponent,
    ContractListComponent,
    OrderInvoiceListComponent,
    SaleOrderMenuComponent
  ]
})

export class ContractModule {}
