import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ContractService} from "../../contract.service";

@Component({
  selector: 'order-invoice-list',
  templateUrl:'./order.invoice.list.component.html',
  styleUrls: ['./order.invoice.list.component.css']
})
export class OrderInvoiceListComponent implements OnInit {

  constructor(private contractService: ContractService,
              private router:Router) {
  }

  ngOnInit(): void {
  }

}