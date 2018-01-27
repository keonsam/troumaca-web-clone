import {Component, OnInit} from "@angular/core";
import {SiteService} from "../site.service";
import {Phones} from "../phones";

@Component({
  selector: 'site-phone-list',
  templateUrl: './site.phone.list.component.html',
  styleUrls: ['./site.phone.list.component.css']
})
export class SitePhoneListComponent implements OnInit {

  private _phones:Phones;
  private defaultPage:number = 1;
  private _routerLinkCreatePhone:string = "/sites/phones/create";

  constructor(private siteService:SiteService) {
  }

  ngOnInit(): void {
    this.siteService
    .getPhones(this.defaultPage)
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

  public createNew(event:Event) {
    console.log("createNew");
  }

}