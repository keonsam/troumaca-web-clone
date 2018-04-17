import {Component, OnInit} from "@angular/core";
import {Emails} from "../emails";
import {SiteService} from "../site.service";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

@Component({
  selector: 'site-email-list',
  templateUrl: './site.email.list.component.html',
  styleUrls: ['./site.email.list.component.css']
})
export class SiteEmailListComponent implements OnInit {

  private emailId: string;
  private _emails:Emails;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";
  private _routerLinkCreateEmail:string = "/sites/emails/create";

  constructor(private siteService:SiteService) {
    let newEmails = new Emails();
    newEmails.page = new Page(0, 0, 0);
    newEmails.sort = new Sort();
    this.emails = newEmails;

  }

  ngOnInit(): void {
    this.getEmails();
  }

  get emails(): Emails {
    return this._emails;
  }

  set emails(value: Emails) {
    this._emails = value;
  }

  get routerLinkCreateEmail(): string {
    return this._routerLinkCreateEmail;
  }

  set routerLinkCreateEmail(value: string) {
    this._routerLinkCreateEmail = value;
  }

  getEmails() {
    this.siteService.getEmails(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.emails = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  onOpenModal(emailId: string) {
    this.emailId = emailId
  }

  onDelete() {
    this.siteService
    .deleteEmail(this.emailId)
    .subscribe(value => {
    this.getEmails();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getEmails();
  }
}
