import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SiteService } from '../site.service';
import { WebSite } from "../web.site";

@Injectable()
export class WebSiteResolve implements Resolve<WebSite> {
  constructor(private siteService: SiteService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.siteService.getWebSite(route.paramMap.get('siteId'));
  }
}
