// import {Component, OnInit} from '@angular/core';
// import {Organizations} from '../../organizations';
// import {Page} from '../../../page/page';
// import {Sort} from '../../../sort/sort';
// import { OrganizationService } from '../organization.service';
// import {PageEvent} from '@angular/material';
// import {ActivatedRoute} from '@angular/router';
// import {ORGANIZATION, PARTY} from '../../../app/routes';
//
// @Component({
//   selector: 'app-organization-list',
//   templateUrl: './organization.list.component.html',
//   styleUrls: ['./organization.list.component.css']
// })
// export class OrganizationListComponent implements OnInit {
//
//   private partyId: string;
//   organizationName: string;
//   organizations: Organizations;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//   routerLinkCreateUser = `/${PARTY}/${ORGANIZATION}/create`;
//
//   constructor(private organizationService: OrganizationService,
//               private route: ActivatedRoute) {
//
//     const newOrganizations = new Organizations();
//     newOrganizations.page = new Page(0, 0, 0);
//     newOrganizations.sort = new Sort();
//     this.organizations = newOrganizations;
//   }
//
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['organizations']) {
//       this.organizations = this.route.snapshot.data['organizations'];
//     }
//   }
//
//   private getOrganizations() {
//     this.organizationService
//     .getOrganizations(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//     .subscribe(next => {
//       this.organizations = next;
//     }, error => {
//       console.log(error);
//     }, () => {
//       console.log('complete');
//     });
//   }
//
//   onOpenModal(partyId: string, organizationName: string) {
//     this.partyId = partyId;
//     this.organizationName = organizationName;
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.organizationService
//         .deleteOrganization(this.partyId)
//         .subscribe(value => {
//           if (value) {
//             this.getOrganizations();
//           }
//         }, error => {
//           console.log(error);
//         }, () => {
//           console.log('complete');
//         });
//     }
//   }
//
//   onRequestPage(pageEvent: PageEvent) {
//     this.defaultPage = pageEvent.pageIndex + 1;
//     this.defaultPageSize = pageEvent.pageSize;
//    this.getOrganizations();
//   }
//
//
// }
