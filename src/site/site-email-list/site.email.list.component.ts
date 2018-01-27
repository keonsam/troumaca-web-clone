import {Component, OnInit} from "@angular/core";
import {Emails} from "../emails";
import {SiteService} from "../site.service";

@Component({
  selector: 'site-email-list',
  templateUrl: './site.email.list.component.html',
  styleUrls: ['./site.email.list.component.css']
})
export class SiteEmailListComponent implements OnInit {

  private _emails:Emails;
  private defaultPage:number = 1;

  constructor(private siteService:SiteService) {
    this.emails = new Emails();
  }

  ngOnInit(): void {
    this.siteService.getEmails(this.defaultPage)
      .subscribe(next => {
        console.log(next);
        this.emails = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });
  }

  get emails(): Emails {
    return this._emails;
  }

  set emails(value: Emails) {
    this._emails = value;
  }

}