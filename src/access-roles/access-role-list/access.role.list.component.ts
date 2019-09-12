// import {Component, OnInit} from '@angular/core';
// import {AccessRoleService} from '../access.role.service';
// import {AccessRoles} from '../access.roles';
// import {Page} from '../../page/page';
// import {Sort} from '../../sort/sort';
//
// @Component({
//   selector: 'access-role-list',
//   templateUrl: './access.role.list.component.html',
//   styleUrls: ['./access.role.list.component.css']
// })
// export class AccessRoleListComponent implements OnInit {
//
//   private accessRoleId: string;
//   accessRoles: AccessRoles;
//   accessRoleName: string;
//   private defaultPage = 1;
//   private defaultPageSize = 10;
//   private defaultSortOrder = 'asc';
//
//   constructor(private accessRoleService: AccessRoleService){
//     const newAccessRoles = new AccessRoles();
//     newAccessRoles.page = new Page();
//     newAccessRoles.sort = new Sort();
//     this.accessRoles = newAccessRoles;
//   }
//
//
//   ngOnInit(): void {
//     this.getAccessRoles();
//   }
//
//   private getAccessRoles() {
//     this.accessRoleService.getAccessRoles(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
//       .subscribe(next => {
//         this.accessRoles = next;
//       }, error => {
//         console.log(error);
//       }, () => {
//         console.log('complete');
//       });
//   }
//
//   onOpenModal(accessRoleId: string, accessRoleName: string){
//     this.accessRoleId = accessRoleId;
//     this.accessRoleName = accessRoleName
//   }
//
//   onDelete(deleted: boolean) {
//     if (deleted) {
//       this.accessRoleService.deleteAccessRole(this.accessRoleId)
//         .subscribe(next => {
//           if (next) {
//             this.getAccessRoles();
//           }
//         });
//     }
//   }
//
//   onRequestPage(pageNumber: number) {
//     this.defaultPage = pageNumber;
//     this.getAccessRoles();
//   }
//
// }
