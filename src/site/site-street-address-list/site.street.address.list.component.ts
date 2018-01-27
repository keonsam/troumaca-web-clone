import {Component, OnInit} from "@angular/core";
import {StreetAddress} from "../street.address";
import {StreetAddresses} from "../street.addresses";
import {SiteService} from "../site.service";

@Component({
  selector: 'site-street-address-list',
  templateUrl: './site.street.address.list.component.html',
  styleUrls: ['./site.street.address.list.component.css']
})
export class SiteStreetAddressListComponent implements OnInit {

  private _streetAddresses:StreetAddresses;
  private defaultPage:number = 1;

  constructor(private siteService:SiteService) {
    this.streetAddresses = new StreetAddresses();
  }

  ngOnInit(): void {
    this.siteService
      .getStreetAddresses(this.defaultPage)
      .subscribe(next => {
        console.log(next);
        this.streetAddresses = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });

  }

  get streetAddresses(): StreetAddresses {
    return this._streetAddresses;
  }

  set streetAddresses(value: StreetAddresses) {
    this._streetAddresses = value;
  }

}