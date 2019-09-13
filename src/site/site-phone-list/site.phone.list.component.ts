// import {Component, OnInit} from '@angular/core';
// import {SiteService} from '../site.service';
// import {Phones} from '../phones';
// import {Page} from '../../page/page';
// import {Sort} from '../../sort/sort';
//
// @Component({
//   selector: 'site-phone-list',
//   templateUrl: './site.phone.list.component.html',
//   styleUrls: ['./site.phone.list.component.css']
// })
// export class SitePhoneListComponent implements OnInit {
//
//   private siteId: string;
//   phones: Phones;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//   routerLinkCreatePhone = '/sites/phones/create';
//   phoneName: string;
//
//   constructor(private siteService: SiteService) {
//     const newPhones = new Phones();
//     newPhones.page = new Page(0, 0, 0);
//     newPhones.sort = new Sort();
//     this.phones = newPhones;
//   }
//
//   ngOnInit(): void {
//     this.getPhones();
//   }
//
//   private getPhones() {
//     this.siteService
//     .getPhones(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//     .subscribe(next => {
//       this.phones = next;
//     }, error => {
//       console.log(error);
//     }, () => {
//       console.log('complete');
//     });
//   }
//
//   onOpenModal(siteId: string, phoneName: string) {
//     this.siteId = siteId;
//     this.phoneName = phoneName;
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.siteService
//         .deletePhone(this.siteId)
//         .subscribe(value => {
//           this.getPhones();
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
//    this.getPhones();
//   }
//
// }
