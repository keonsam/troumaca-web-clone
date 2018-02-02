import {Component, OnInit} from "@angular/core";
import {SiteService} from "../site.service";
import {Phones} from "../phones";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

@Component({
  selector: 'site-phone-list',
  templateUrl: './site.phone.list.component.html',
  styleUrls: ['./site.phone.list.component.css']
})
export class SitePhoneListComponent implements OnInit {

  private _phones:Phones;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";
  private _routerLinkCreatePhone:string = "/sites/phones/create";

  constructor(private siteService:SiteService) {
    let newPhones = new Phones();
    newPhones.page = new Page(0, 0, 0);
    newPhones.sort = new Sort();
    this.phones = newPhones;
  }

  ngOnInit(): void {
    this.siteService
    .getPhones(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      console.log(next);
      this.phones = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  get phones(): Phones {
    return this._phones;
  }

  set phones(value: Phones) {
    this._phones = value;
  }

  get routerLinkCreatePhone(): string {
    return this._routerLinkCreatePhone;
  }

  set routerLinkCreatePhone(value: string) {
    this._routerLinkCreatePhone = value;
  }

  onDelete() {

  }

}
