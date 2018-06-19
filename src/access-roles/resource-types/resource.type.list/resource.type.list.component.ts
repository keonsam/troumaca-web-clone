import {Component, OnInit} from '@angular/core';
import {AccessRoleService} from '../../access.role.service';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import {ResourceTypes} from '../../resource.types';

@Component({
  selector: 'resource-type-list',
  templateUrl: './resource.type.list.component.html',
  styleUrls: ['./resource.type.list.component.css']
})
export class ResourceTypeListComponent implements OnInit {
  private resourceTypeId: string;
  private _resourceTypes: ResourceTypes;
  private _resourceTypeName: string;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  constructor(private accessRoleService: AccessRoleService){
    const newResourceTypes = new ResourceTypes();
    newResourceTypes.page = new Page();
    newResourceTypes.sort = new Sort();
    this.resourceTypes = newResourceTypes;
  }


  ngOnInit(): void {
    this.getResourceTypes();
  }

  getResourceTypes() {
    this.accessRoleService.getResourceTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.resourceTypes = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  get resourceTypeName(): string {
    return this._resourceTypeName;
  }

  set resourceTypeName(value: string) {
    this._resourceTypeName = value;
  }

  get resourceTypes(): ResourceTypes {
    return this._resourceTypes;
  }

  set resourceTypes(value: ResourceTypes) {
    this._resourceTypes = value;
  }

  onOpenModal(resourceTypeId: string, resourceTypeName: string){
    this.resourceTypeId = resourceTypeId;
    this.resourceTypeName = resourceTypeName
  }

  onDelete() {
    this.accessRoleService.deleteResourceType(this.resourceTypeId)
      .subscribe(next => {
        if (next) {
          this.getResourceTypes();
        }
      });
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getResourceTypes();
  }
}
