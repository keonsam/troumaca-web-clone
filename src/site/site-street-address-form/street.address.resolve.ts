import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SiteService } from '../site.service';
import {StreetAddress} from "../street.address";

@Injectable()
export class StreetAddressResolve implements Resolve<StreetAddress> {
  constructor(private siteService: SiteService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.siteService.getStreetAddress(route.paramMap.get('siteId'));
  }
}
