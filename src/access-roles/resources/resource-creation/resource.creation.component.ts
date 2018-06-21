import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Resource} from '../../resource';
import {AccessRoleService} from '../../access.role.service';
import {Router} from '@angular/router';
import {ResourcePermission} from '../../resource.permission';
import {Permissions} from '../../permissions';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';

@Component({
  selector: 'resource-creation',
  templateUrl: './resource.creation.component.html',
  styleUrls: ['./resource.creation.component.css']
})
export class ResourceCreationComponent implements OnInit {
  private _name: FormControl;
  private _resourceTypeId: FormControl;
  private _description: FormControl;
  private resource: Resource;
  private _assignedArray: string[];
  private _resourcePermissionIds: ResourcePermission[];
  private _permissions: Permissions;
  private _resourcePermissions: Permissions;
  private _resourceTypeIdDataService: CompleterData;
  private _resourceForm: FormGroup;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  private pageSize = 15;
  private _doNotDisplayFailureMessage: boolean;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.name = new FormControl('', [Validators.required]);
    this.resourceTypeId = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.resourceForm = formBuilder.group({
      'name': this.name,
      'resourceTypeId': this.resourceTypeId,
      'description': this.description
    });

    this.resourceForm
      .valueChanges
      .subscribe(value => {
        this.resource.name = value.name;
        this.resource.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.resourcePermissionIds = [];
    const newPermissions = new Permissions();
    newPermissions.permissions = [];
    newPermissions.page = new Page();
    newPermissions.sort = new Sort();
    this.permissions = newPermissions;
    this.resourcePermissions = newPermissions;

    this.assignedArray = [];
    this.resource = new Resource();
    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.getPermissions('permissions');
    this.populateResourceTypeIdDropDown();
  }

  private getPermissions(type) {
    this.accessRoleService.getPermissionsByArray(this.defaultPage, this.defaultPageSize, this.defaultSortOrder, this.assignedArray, type)
        .subscribe(values => {
          if (type === 'permissions') {
            this.permissions = values;
          }else{
            this.resourcePermissions = values;
          }
        }, onError => {
          console.log(onError);
        });
  };

  private populateResourceTypeIdDropDown() {
    this.findResourceTypeId('');
    this.resourceForm.get('resourceTypeId').valueChanges
      //.debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findResourceTypeId(value);
      });
  }

  findResourceTypeId(value) {
    this.accessRoleService
      .findResourceTypeId(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            resourceTypeId: v2.resourceTypeId,
            name: v2.name,
          };
        })
      })
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

  get resourcePermissions(): Permissions {
    return this._resourcePermissions;
  }

  set resourcePermissions(value: Permissions) {
    this._resourcePermissions = value;
  }

  get resourcePermissionIds(): ResourcePermission[] {
    return this._resourcePermissionIds;
  }

  set resourcePermissionIds(value: ResourcePermission[]) {
    this._resourcePermissionIds = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
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

  onResourceTypeIdSelect(selected: CompleterItem) {
    if (selected) {
      this.resource.resourceTypeId = selected.originalObject.resourceTypeId;
    }
  }

  onPermissionDoubleClick(name, permissionId: string) {
    this.assignedArray.push(permissionId);
    this.resourcePermissionIds.push(new ResourcePermission(name, permissionId));
    this.getPermissions('permissions');
    this.getPermissions('resource-permissions');
  }

  onResourceDoubleClick(permissionId: string) {
    this.assignedArray = this.assignedArray.filter(val => {
      return val !== permissionId;
    });
    this.resourcePermissionIds = this.resourcePermissionIds.filter( val => {
      return val.permission.permissionId !== permissionId;
    });
    this.getPermissions('permissions');
    this.getPermissions('resource-permissions');
  }

  onRequestPage(pageNumber: number, type: string) {
    this.defaultPage = pageNumber;
    this.getPermissions(type);
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addResource(this.resource, this.resourcePermissionIds)
      .subscribe( resource => {
        if (resource.resourceId) {
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
