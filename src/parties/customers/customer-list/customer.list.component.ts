import {Component, OnInit} from '@angular/core';
import {Parties} from '../../parties';

@Component({
  selector: 'customer-list',
  templateUrl: './customer.list.component.html',
  styleUrls: ['./customer.list.component.css']
})
export class CustomerListComponent implements OnInit {

  private _routerLinkCreateCustomer: string;
  private _parties: Parties;

  constructor() {
    this.routerLinkCreateCustomer = '/parties/customers/create';
    this.parties = new Parties();
  }

  ngOnInit(): void {
  }

  get routerLinkCreateCustomer(): string {
    return this._routerLinkCreateCustomer;
  }

  set routerLinkCreateCustomer(value: string) {
    this._routerLinkCreateCustomer = value;
  }

  get parties(): Parties {
    return this._parties;
  }

  set parties(value: Parties) {
    this._parties = value;
  }

  onRequestPage(event: any) {
    console.log('not implemented');
  }

}
