import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Resource} from '../../resource';
import {AccessRoleService} from '../../access.role.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ResourcePermission} from '../../resource.permission';
import {Permissions} from '../../permissions';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource.form.component.html',
  styleUrls: ['./resource.form.component.css']
})

export class ResourceFormComponent implements OnInit {
  name: FormControl;
  resourceTypeId: FormControl;
  description: FormControl;
  assignedArray: string[];
  permissions: Permissions;
  assignablePermissions: Permissions;
  resourcePermissions: ResourcePermission[];
  // resourceTypeIdDataService: CompleterData;
  resourceForm: FormGroup;
  resourceExist = false;
  doNotDisplayFailureMessage: boolean;

  private pageSize = 15;
  private resourceId: string;
  private resource: Resource;
  private assignedPageNumber = 1;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  constructor(private accessRoleService: AccessRoleService,
              // private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl('', [Validators.required]);
    this.resourceTypeId = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.resourceForm = formBuilder.group({
      'name': this.name,
      'resourceTypeId': this.resourceTypeId,
      'description': this.description
    });

    this.resource = new Resource();

    this.resourceForm
      .valueChanges
      .subscribe(value => {
        this.resource.name = value.name;
        this.resource.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    const newPermissions = new Permissions();
    newPermissions.permissions = [];
    newPermissions.page = new Page();
    newPermissions.sort = new Sort();
    this.permissions = newPermissions;
    this.assignablePermissions = newPermissions;
    this.resourcePermissions = [];

    this.assignedArray = [];
    this.resource = new Resource();
    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['resource']) {
      this.setInputValues(this.route.snapshot.data['resource']);
    } else {
      this.getPermissions();
      this.getAssignablePermissions();
    }

    this.populateResourceTypeIdDropDown();
  }

  private setInputValues(resource: Resource) {
    this.name.setValue(resource.name);
    this.resourceTypeId.setValue(resource.resourceType.name);
    this.description.setValue(resource.description);
    this.resource = resource;
    this.resourcePermissions = resource.resourcePermissions;
    this.assignedArray = resource.resourcePermissions.map(x => x.permissionId);
    this.resourceExist = true;
    this.getPermissions();
    this.getAssignablePermissions();
  }

  private getPermissions() {
    this.accessRoleService.getPermissionsByArray(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
      .subscribe(values => {
        this.permissions = values;
      }, onError => {
        console.log(onError);
      });
  };

  private getAssignablePermissions() {
    this.accessRoleService.getAssignablePermissions(this.assignedPageNumber, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
      .subscribe(values => {
        this.assignablePermissions = values;
      }, onError => {
        console.log(onError);
      });
  };

  private populateResourceTypeIdDropDown() {
    if (!this.resource.resourceTypeId) {
      this.findResourceTypeId('');
    }
    this.resourceForm.get('resourceTypeId').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findResourceTypeId(value);
      });
  }

  private findResourceTypeId(value) {
    this.accessRoleService
      .findResourceTypeId(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            resourceTypeId: v2.resourceTypeId,
            name: v2.name,
          };
        })
      }))
      .subscribe(next => { // update the data
        // this.resourceTypeIdDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findResourceTypeId error - ' + error);
      });
  }


  // onResourceTypeIdSelect(selected: CompleterItem) {
  //   if (selected) {
  //     this.resource.resourceTypeId = selected.originalObject.resourceTypeId;
  //   }
  // }

  onPermissionDoubleClick(permissionId: string) {
    this.resourcePermissions.push(new ResourcePermission(permissionId));
    this.assignedArray.push(permissionId);
    this.getPermissions();
    this.getAssignablePermissions();
  }

  onResourceDoubleClick(permissionId: string) {
    this.assignedArray = this.assignedArray.filter(val => val !== permissionId);
    this.resourcePermissions = this.resourcePermissions.filter(val => val.permissionId !== permissionId);
    this.getPermissions();
    this.getAssignablePermissions();
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getPermissions();
  }

  onAssignedRequestPage(pageNumber: number) {
    this.assignedPageNumber = pageNumber;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addResource(this.resource, this.resourcePermissions)
      .subscribe(resource => {
        if (resource.resourceId) {
          this.router.navigate(['/access-roles/resources']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
    this.resourcePermissions.forEach(value => {
      if (!value.resourceId) {
        value.resourceId = this.resource.resourceId;
      }
    });
    this.accessRoleService.updateResource(this.resource, this.resourcePermissions)
      .subscribe(resource => {
        if (resource) {
          this.router.navigate(['/access-roles/resources']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/resources']);
  }

}
