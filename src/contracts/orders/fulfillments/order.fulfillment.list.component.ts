import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {ContractService} from "../../contract.service";

@Component({
  selector: 'order-fulfillment-list',
  templateUrl:'./order.fulfillment.list.component.html',
  styleUrls: ['./order.fulfillment.list.component.css']
})
export class OrderFulfillmentListComponent {

  constructor(private contractService: ContractService,
              private router:Router) {
  }

}