import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';

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
  private _name: FormControl;
  private _resourceTypeId: FormControl;
  private _description: FormControl;
  private resource: Resource;
  private _assignedArray: string[];
  private _permissions: Permissions;
  private _resourcePermissions: ResourcePermission[];
  private _resourceTypeIdDataService: CompleterData;
  private _resourceForm: FormGroup;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  private pageSize = 15;
  private _doNotDisplayFailureMessage: boolean;
  private resourceId: string;
  public resourceExist = false;
  public assignedPageNumber = 1;
  public getAssignedPage: Page;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
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
    }

    this.populateResourceTypeIdDropDown();
  }

  private setInputValues(resource: Resource) {
    this.name.setValue(resource.name);
    this.resourceTypeId.setValue(resource.resourceTypeName);
    this.description.setValue(resource.description);
    this.resource = resource;
    this.resourceExist = true;
    this.getResourcePermissions();
  }

  private getPermissions() {
    this.accessRoleService.getPermissionsByArray(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray)
      .subscribe(values => {
        this.permissions = values;
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
        this.resourceTypeIdDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findResourceTypeId error - ' + error);
      });
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get resourceTypeId(): FormControl {
    return this._resourceTypeId;
  }

  set resourceTypeId(value: FormControl) {
    this._resourceTypeId = value;
  }

  get resourceTypeIdDataService(): CompleterData {
    return this._resourceTypeIdDataService;
  }

  set resourceTypeIdDataService(value: CompleterData) {
    this._resourceTypeIdDataService = value;
  }

  get assignedArray(): string[] {
    return this._assignedArray;
  }

  set assignedArray(value: string[]) {
    this._assignedArray = value;
  }

  get permissions(): Permissions {
    return this._permissions;
  }

  set permissions(value: Permissions) {
    this._permissions = value;
  }

  get resourcePermissions(): ResourcePermission[] {
    return this._resourcePermissions;
  }

  set resourcePermissions(value: ResourcePermission[]) {
    this._resourcePermissions = value;
  }

  get resourceForm(): FormGroup {
    return this._resourceForm;
  }

  set resourceForm(value: FormGroup) {
    this._resourceForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  getResourcePermissions() {
    this.accessRoleService.getResourcePermissionsByResourceId(this.resource.resourceId)
      .subscribe(values => {
        this.resourcePermissions = values;
        this.assignedArray = values.map(x => x.permissionId);
        this.getPermissions();
        this.setAssignedPage();
      });
  }

  onPermissionDoubleClick(name: string, permissionId: string, description) {
    this.resourcePermissions.push(new ResourcePermission(name, permissionId, description));
    this.assignedArray.push(permissionId);
    this.setAssignedPage();
    this.getPermissions();
  }

  onResourceDoubleClick(permissionId: string) {
    this.assignedArray = this.assignedArray.filter(val => val !== permissionId);
    this.resourcePermissions = this.resourcePermissions.filter(val => val.permissionId !== permissionId);
    this.setAssignedPage();
    this.getPermissions();
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getPermissions();
  }

  onResourceTypeIdSelect(selected: CompleterItem) {
    if (selected) {
      this.resource.resourceTypeId = selected.originalObject.resourceTypeId;
    }
  }

  private setAssignedPage() {
    const page: Page = new Page();
    page.number = this.assignedPageNumber;
    page.size = this.defaultPageSize;
    page.items = this.getAssignedPermissions().length;
    page.totalItems = this.resourcePermissions.length;
    this.getAssignedPage = page;
  }

  getAssignedPermissions() {
    if (this.assignedPageNumber < 2) {
      return this.resourcePermissions.slice(0, 10);
    }else {
      const begin = (this.assignedPageNumber - 1) * this.defaultPageSize;
      const end = (this.assignedPageNumber - 1) * this.defaultPageSize + 10;
      return this.resourcePermissions.slice(begin, end);
    }
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
