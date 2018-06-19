import {Component, OnInit} from '@angular/core';
import {Emails} from '../emails';
import {SiteService} from '../site.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'site-email-list',
  templateUrl: './site.email.list.component.html',
  styleUrls: ['./site.email.list.component.css']
})
export class SiteEmailListComponent implements OnInit {

  private emailId: string;
  private _emails: Emails;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateEmail = '/sites/emails/create';
  private _emailName: string;

  constructor(private siteService: SiteService) {
    const newEmails = new Emails();
    newEmails.page = new Page(0, 0, 0);
    newEmails.sort = new Sort();
    this.emails = newEmails;

  }

  ngOnInit(): void {
    this.getEmails();
  }

  get emailName(): string {
    return this._emailName;
  }

  set emailName(value: string) {
    this._emailName = value;
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
      console.log('complete');
    });
  }

  onOpenModal(emailId: string, emailName: string) {
    this.emailId = emailId;
    this.emailName = emailName;
  }

  onDelete() {
    this.siteService
    .deleteEmail(this.emailId)
    .subscribe(value => {
    this.getEmails();
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
    });
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getEmails();
  }
}
