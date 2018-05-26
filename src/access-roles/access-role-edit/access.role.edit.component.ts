import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessRoleService} from "../access.role.service";
import {AccessRole} from "../access.role";
import {AccessRoleType} from "../access.role.type";
import {Resources} from "../resources";
import {ResourcePermission} from "../resource.permission";
import {Grant} from "../grant";
import {Sort} from "../../sort/sort";
import {Page} from "../../page/page";

@Component({
  selector: 'access-role-edit',
  templateUrl: './access.role.edit.component.html',
  styleUrls: ['./access.role.edit.component.css']
})
export class AccessRoleEditComponent implements OnInit {

  private _prohibitionIndicator: FormControl;
  private _name: FormControl;
  private _effectiveDate: FormControl;
  private _untilDate: FormControl;
  private _description: FormControl;
  private _accessRoleTypeId: FormControl;
  private _accessRoleTypeDataService: CompleterData;

  private accessRole: AccessRole;
  private _resources: Resources;
  private _resourcePermissions : ResourcePermission[];
  private _grants: Grant[];

  private accessRoleId: string;
  private sub: any;

  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  private _accessRoleForm: FormGroup;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.prohibitionIndicator = new FormControl(false);
    this.name = new FormControl("", [Validators.required]);
    this.accessRoleTypeId = new FormControl("", [Validators.required]);
    this.effectiveDate = new FormControl(this.getDateString(new Date()), [Validators.required]);
    this.untilDate = new FormControl(this.getDateString(new Date( new Date().getTime() + (2678400000 * 6))));
    this.description = new FormControl("");

    this.accessRoleForm = formBuilder.group({
      "prohibitionIndicator": this.prohibitionIndicator,
      "name": this.name,
      "accessRoleTypeId": this.accessRoleTypeId,
      "effectiveDate": this.effectiveDate,
      "untilDate": this.untilDate,
      "description": this.description
    });

    this.accessRoleForm
      .valueChanges
      .subscribe( value => {
        this.accessRole.prohibitionIndicator = value.prohibitionIndicator;
        this.accessRole.name = value.name;
        this.accessRole.effectiveDate = value.effectiveDate;
        this.accessRole.untilDate = value.untilDate;
        this.accessRole.description = value.description;
      });

    this.accessRole = new AccessRole();
    this.accessRole.accessRoleType = new AccessRoleType();

    let newResources = new Resources();
    newResources.resources = [];
    newResources.page = new Page();
    newResources.sort = new Sort();
    this.resources = newResources;

    this.resourcePermissions = [];
    this.grants = [];
    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe( params => {
      this.accessRoleId = params['accessRoleId'];
      this.accessRoleService.getAccessRoleById(this.accessRoleId)
        .subscribe( accessRole => {
          this.prohibitionIndicator.setValue(accessRole.prohibitionIndicator);
          this.name.setValue(accessRole.name);
          this.accessRoleTypeId.setValue(accessRole.accessRoleType.name);
          this.effectiveDate.setValue(accessRole.effectiveDate);
          this.untilDate.setValue(accessRole.untilDate);
          this.description.setValue(accessRole.description);
          this.accessRole = accessRole;
          this.getGrants();
        }, error => {
          console.log(error);
        }, () => {
          console.log("complete");
        });
    });
    this.getResourcePermissions();
    this.populateAccessRoleTypeDropDown();
  }

  private getResources() {
    this.accessRoleService.getResources(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(values => {
        this.resources = values;
      }, onError => {
        console.log(onError);
      });
  };

  private getResourcePermissions() {
    this.accessRoleService.getAllResourcePermissions()
      .subscribe(values => {
        this.resourcePermissions = values;
      }, onError => {
        console.log(onError);
      });
  }

  populateAccessRoleTypeDropDown() {
    if(!this.accessRole.accessRoleType.accessRoleTypeId) {
      this.findAccessRoleTypeId("");
    }
    this.accessRoleForm.get("accessRoleTypeId").valueChanges
      //.debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findAccessRoleTypeId(value);
      });
  }

  findAccessRoleTypeId(value) {
    this.accessRoleService
      .findAccessRoleTypeId(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            accessRoleTypeId: v2.accessRoleTypeId,
            name: v2.name,
          };
        })
      })
      .subscribe(next => { // update the data
        this.accessRoleTypeDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log("findAccessRoleType error - " + error);
      });
  }

  getDateString(date: Date) {
    return date.toISOString().substring(0,10);
  }

  get prohibitionIndicator(): FormControl {
    return this._prohibitionIndicator;
  }

  set prohibitionIndicator(value: FormControl) {
    this._prohibitionIndicator = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get effectiveDate(): FormControl {
    return this._effectiveDate;
  }

  set effectiveDate(value: FormControl) {
    this._effectiveDate = value;
  }

  get untilDate(): FormControl {
    return this._untilDate;
  }

  set untilDate(value: FormControl) {
    this._untilDate = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get accessRoleTypeId(): FormControl {
    return this._accessRoleTypeId;
  }

  set accessRoleTypeId(value: FormControl) {
    this._accessRoleTypeId = value;
  }

  get accessRoleTypeDataService(): CompleterData {
    return this._accessRoleTypeDataService;
  }

  set accessRoleTypeDataService(value: CompleterData) {
    this._accessRoleTypeDataService = value;
  }

  get resources(): Resources {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  get resourcePermissions(): ResourcePermission[] {
    return this._resourcePermissions;
  }

  set resourcePermissions(value: ResourcePermission[]) {
    this._resourcePermissions = value;
  }

  get grants(): Grant[] {
    return this._grants;
  }

  set grants(value: Grant[]) {
    this._grants = value;
  }

  get accessRoleForm(): FormGroup {
    return this._accessRoleForm;
  }

  set accessRoleForm(value: FormGroup) {
    this._accessRoleForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  getGrants() {
    this.accessRoleService.getGrantsByAccessRoleId(this.accessRoleId)
      .subscribe( values => {
        this.grants = values;
        this.getResources();
      });
    }

  getPermission(resourceId: string) {
    let newArray = this.resourcePermissions.filter(value => {
      return value.resourceId === resourceId;
    });
    return newArray;
  }

  onPermissionsChange(event, resourceId: string, resourcePermissionId: string) {
    if (event.target.checked) {
      this.grants.push(new Grant(resourceId, resourcePermissionId));
    }else {
      this.grants = this.grants.filter(value => {
        return value.resourcePermissionId !== resourcePermissionId;
      });
    }
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getResources();
  }

  onAccessRoleTypeSelect(selected: CompleterItem) {
    if (selected) {
      this.accessRole.accessRoleTypeId = selected.originalObject.accessRoleTypeId;
    }
  }

  isChecked(resourcePermissionId) {
    let index = this.grants.find(x => { return x.resourcePermissionId === resourcePermissionId});
    if(index) {
       return true;
    }else {
      return false;
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.grants.forEach(value => {
      value.accessRoleId = this.accessRoleId;
    });
    this.accessRoleService.updateAccessRole(this.accessRole, this.grants)
      .subscribe( numUpdated => {
        if (numUpdated) {
          this.router.navigate(['/access-roles/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/listing']);
  }
}
