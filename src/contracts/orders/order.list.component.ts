import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ContractService} from '../contract.service';

@Component({
  selector: 'order-list',
  templateUrl: './order.list.component.html',
  styleUrls: ['./order.list.component.css']
})
export class OrderListComponent implements OnInit {

  constructor(private contractService: ContractService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
