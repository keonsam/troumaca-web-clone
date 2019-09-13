// import {Component, OnInit} from '@angular/core';
// import {Emails} from '../emails';
// import {SiteService} from '../site.service';
// import {Page} from '../../page/page';
// import {Sort} from '../../sort/sort';
//
// @Component({
//   selector: 'site-email-list',
//   templateUrl: './site.email.list.component.html',
//   styleUrls: ['./site.email.list.component.css']
// })
// export class SiteEmailListComponent implements OnInit {
//
//   private emailId: string;
//   emails: Emails;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//   routerLinkCreateEmail = '/sites/emails/create';
//   emailName: string;
//
//   constructor(private siteService: SiteService) {
//     const newEmails = new Emails();
//     newEmails.page = new Page(0, 0, 0);
//     newEmails.sort = new Sort();
//     this.emails = newEmails;
//
//   }
//
//   ngOnInit(): void {
//     this.getEmails();
//   }
//
//   private getEmails() {
//     this.siteService.getEmails(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//     .subscribe(next => {
//       this.emails = next;
//     }, error => {
//       console.log(error);
//     }, () => {
//       console.log('complete');
//     });
//   }
//
//   onOpenModal(emailId: string, emailName: string) {
//     this.emailId = emailId;
//     this.emailName = emailName;
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.siteService
//         .deleteEmail(this.emailId)
//         .subscribe(value => {
//           if (value) {
//             this.getEmails();
//           }
//         }, error => {
//           console.log(error);
//         }, () => {
//           console.log('complete');
//         });
//     }
//   }
//
//   onRequestPage(pageNumber: number) {
//    this.defaultPage = pageNumber;
//    this.getEmails();
//   }
// }
