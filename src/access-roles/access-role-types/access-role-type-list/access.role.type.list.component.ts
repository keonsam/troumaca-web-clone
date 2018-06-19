import {Component, OnInit} from '@angular/core';
import {AccessRoleService} from '../../access.role.service';
import {AccessRoleTypes} from '../../access.role.types';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';

@Component({
  selector: 'access-role-type-list',
  templateUrl: './access.role.type.list.component.html',
  styleUrls: ['./access.role.type.list.component.css']
})
export class AccessRoleTypeListComponent implements OnInit {

  private accessRoleTypeId: string;
  private _accessRoleTypes: AccessRoleTypes;
  private _accessRoleTypeName: string;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  constructor(private accessRoleService: AccessRoleService){
    const newAccessRoleTypes = new AccessRoleTypes();
    newAccessRoleTypes.page = new Page();
    newAccessRoleTypes.sort = new Sort();
    this.accessRoleTypes = newAccessRoleTypes;
  }


  ngOnInit(): void {
    this.getAccessRoleTypes();
  }

  getAccessRoleTypes() {
    this.accessRoleService.getAccessRoleTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.accessRoleTypes = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  get accessRoleTypeName(): string {
    return this._accessRoleTypeName;
  }

  set accessRoleTypeName(value: string) {
    this._accessRoleTypeName = value;
  }

  get accessRoleTypes(): AccessRoleTypes {
    return this._accessRoleTypes;
  }

  set accessRoleTypes(value: AccessRoleTypes) {
    this._accessRoleTypes = value;
  }

  onOpenModal(accessRoleTypeId: string, accessRoleTypeName: string){
    this.accessRoleTypeId = accessRoleTypeId;
    this.accessRoleTypeName = accessRoleTypeName
  }

  onDelete() {
    this.accessRoleService.deleteAccessRoleType(this.accessRoleTypeId)
      .subscribe(next => {
        if (next) {
          this.getAccessRoleTypes();
        }
      });
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getAccessRoleTypes();
  }

}
