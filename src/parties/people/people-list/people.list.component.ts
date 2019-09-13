// import {Component, OnInit} from '@angular/core';
// import {Page} from '../../../page/page';
// import {Sort} from '../../../sort/sort';
// import { PeopleService } from '../people.service';
// import {MatDialog, PageEvent} from '@angular/material';
// import {ActivatedRoute} from '@angular/router';
// import { PEOPLE } from '../../../app/routes';
// import { Persons } from './persons';
// import {DeleteModalComponent} from '../../../delete-modal/delete.modal.component';
//
// @Component({
//   selector: 'app-user-list',
//   templateUrl: './people.list.component.html',
//   styleUrls: ['./people.list.component.css']
// })
// export class PeopleListComponent implements OnInit {
//
//   username: string;
//   users: Persons;
//   link = `/${PEOPLE}`;
//   routerLinkCreateUser = `/${this.link}/create`;
//
//
//   private partyId: string;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//
//   constructor(private userService: PeopleService,
//               private route: ActivatedRoute,
//               public dialog: MatDialog) {
//
//     const newUsers = new Persons();
//     newUsers.page = new Page(0, 0, 0);
//     newUsers.sort = new Sort();
//     this.users = newUsers;
//   }
//
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['users']) {
//       this.users = this.route.snapshot.data['users'];
//     }
//   }
//
//   private getUsers() {
//     this.userService
//     .getPersons(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//     .subscribe(next => {
//       this.users = next;
//     }, error => {
//       console.log(error);
//     }, () => {
//       console.log('complete');
//     });
//   }
//
//   onOpenModal(partyId: string, username: string) {
//     this.partyId = partyId;
//     this.username = username;
//     const dialogRef = this.dialog.open(DeleteModalComponent, {
//       maxWidth: '300px',
//       data: {name: this.username}
//     });
//
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(result);
//       if (result) {
//         this.onDelete(result);
//       }
//     });
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.userService
//         .deletePerson(this.partyId)
//         .subscribe(value => {
//           if (value) {
//             this.getUsers();
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
//    this.defaultPage = pageEvent.pageIndex + 1;
//    this.defaultPageSize = pageEvent.pageSize;
//    this.getUsers();
//   }
// }
