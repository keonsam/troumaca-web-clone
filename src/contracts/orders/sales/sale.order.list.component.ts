import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ContractService} from "../../contract.service";

@Component({
  selector: 'sale-order-list',
  templateUrl:'./sale.order.list.component.html',
  styleUrls: ['./sale.order.list.component.css']
})
export class SaleOrderListComponent {

  constructor(private contractService: ContractService,
              private router:Router) {
  }

}