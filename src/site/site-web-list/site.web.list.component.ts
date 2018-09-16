import {Component, OnInit} from '@angular/core';
import {WebSites} from '../web.sites';
import {SiteService} from '../site.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'site-web-list',
  templateUrl: './site.web.list.component.html',
  styleUrls: ['./site.web.list.component.css']
})
export class SiteWebListComponent implements OnInit {

  private webSiteId: string;
  private _webSites: WebSites;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateWebSite = '/sites/web-sites/create';
  private _webSiteName: string;

  constructor(private siteService: SiteService) {
    const newWebSites = new WebSites();
    newWebSites.page = new Page(0, 0, 0);
    newWebSites.sort = new Sort();
    this.webSites = newWebSites;

  }

  ngOnInit(): void {
    this.getWebSites()
  }

  get webSiteName(): string {
    return this._webSiteName;
  }

  set webSiteName(value: string) {
    this._webSiteName = value;
  }

  get webSites(): WebSites {
    return this._webSites;
  }

  set webSites(value: WebSites) {
    this._webSites = value;
  }

  get routerLinkCreateWebSite(): string {
    return this._routerLinkCreateWebSite;
  }

  set routerLinkCreateWebSite(value: string) {
    this._routerLinkCreateWebSite = value;
  }

  getWebSites() {
    this.siteService.getWebSites(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.webSites = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(webSiteId: string, webSiteName: string) {
    this.webSiteId = webSiteId;
    this.webSiteName = webSiteName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.siteService
        .deleteWebSite(this.webSiteId)
        .subscribe(value => {
          if (value) {
            this.getWebSites();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getWebSites();
  }

}
