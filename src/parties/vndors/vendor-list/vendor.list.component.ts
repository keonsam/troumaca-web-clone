import {Component, OnInit} from '@angular/core';
import {Parties} from '../../parties';

@Component({
  selector: 'vendor-list',
  templateUrl: './vendor.list.component.html',
  styleUrls: ['./vendor.list.component.css']
})
export class VendorListComponent implements OnInit {

  private _routerLinkCreateVendor: string;
  private _parties: Parties;

  constructor() {
    this.routerLinkCreateVendor = '/parties/vendors/create';
    this.parties = new Parties();
  }

  ngOnInit(): void {
  }

  get routerLinkCreateVendor(): string {
    return this._routerLinkCreateVendor;
  }

  set routerLinkCreateVendor(value: string) {
    this._routerLinkCreateVendor = value;
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
