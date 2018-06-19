import {Component, OnInit} from '@angular/core';
import {AccessRoleService} from '../access.role.service';
import {AccessRoles} from '../access.roles';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'access-role-list',
  templateUrl: './access.role.list.component.html',
  styleUrls: ['./access.role.list.component.css']
})
export class AccessRoleListComponent implements OnInit {

  private accessRoleId: string;
  private _accessRoles: AccessRoles;
  private _accessRoleName: string;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  constructor(private accessRoleService: AccessRoleService){
    const newAccessRoles = new AccessRoles();
    newAccessRoles.page = new Page();
    newAccessRoles.sort = new Sort();
    this.accessRoles = newAccessRoles;
  }


  ngOnInit(): void {
    this.getAccessRoles();
  }

  getAccessRoles() {
    this.accessRoleService.getAccessRoles(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.accessRoles = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  get accessRoleName(): string {
    return this._accessRoleName;
  }

  set accessRoleName(value: string) {
    this._accessRoleName = value;
  }

  get accessRoles(): AccessRoles {
    return this._accessRoles;
  }

  set accessRoles(value: AccessRoles) {
    this._accessRoles = value;
  }

  onOpenModal(accessRoleId: string, accessRoleName: string){
    this.accessRoleId = accessRoleId;
    this.accessRoleName = accessRoleName
  }

  onDelete() {
    this.accessRoleService.deleteAccessRole(this.accessRoleId)
      .subscribe(next => {
        if (next) {
          this.getAccessRoles();
        }
      });
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAccessRoles();
  }

}
