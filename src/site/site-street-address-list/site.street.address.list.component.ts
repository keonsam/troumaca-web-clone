import {Component, OnInit} from '@angular/core';
import {StreetAddress} from '../street.address';
import {StreetAddresses} from '../street.addresses';
import {SiteService} from '../site.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'site-street-address-list',
  templateUrl: './site.street.address.list.component.html',
  styleUrls: ['./site.street.address.list.component.css']
})
export class SiteStreetAddressListComponent implements OnInit {

  private streetAddressId: string;
  private _streetAddresses: StreetAddresses;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateStreetAddress = '/sites/street-addresses/create';
  private _streetAddressName: string;

  constructor(private siteService: SiteService) {
    const newStreetAddresses = new StreetAddresses();
    newStreetAddresses.page = new Page(0, 0, 0);
    newStreetAddresses.sort = new Sort();
    this.streetAddresses = newStreetAddresses;
  }

  ngOnInit(): void {
    this.getStreetAddresses();
  }

  get streetAddressName(): string {
    return this._streetAddressName;
  }

  set streetAddressName(value: string) {
    this._streetAddressName = value;
  }

  get streetAddresses(): StreetAddresses {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddresses) {
    this._streetAddresses = value;
  }

  get routerLinkCreateStreetAddress(): string {
    return this._routerLinkCreateStreetAddress;
  }

  set routerLinkCreateStreetAddress(value: string) {
    this._routerLinkCreateStreetAddress = value;
  }

  getStreetAddresses() {
  this.siteService
    .getStreetAddresses(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.streetAddresses = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(streetAddressId: string, streetAddressName: string) {
    this.streetAddressId = streetAddressId;
    this.streetAddressName = streetAddressName;
  }

  onDelete() {
    this.siteService
    .deleteStreetAddress(this.streetAddressId)
    .subscribe(value => {
    this.getStreetAddresses();
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
    });
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getStreetAddresses();
  }

}
