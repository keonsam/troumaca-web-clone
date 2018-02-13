import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ContractService} from "../../contract.service";

@Component({
  selector: 'purchase-order-list',
  templateUrl:'./purchase.order.list.component.html',
  styleUrls: ['./purchase.order.list.component.css']
})
export class PurchaseOrderListComponent {

  constructor(private contractService: ContractService,
              private router:Router) {
  }

}