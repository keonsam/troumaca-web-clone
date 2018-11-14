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
  resourceTypes: ResourceTypes;
  resourceTypeName: string;

  private resourceTypeId: string;
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

  private getResourceTypes() {
    this.accessRoleService.getResourceTypes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.resourceTypes = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }

  onOpenModal(resourceTypeId: string, resourceTypeName: string){
    this.resourceTypeId = resourceTypeId;
    this.resourceTypeName = resourceTypeName
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.accessRoleService.deleteResourceType(this.resourceTypeId)
        .subscribe(next => {
          if (next) {
            this.getResourceTypes();
          }
        });
    }
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getResourceTypes();
  }
}
