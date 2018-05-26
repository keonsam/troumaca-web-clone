import {Component, OnInit} from "@angular/core";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessRole} from "../access.role";
import {AccessRoleType} from "../access.role.type";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Router} from "@angular/router";
import {AccessRoleService} from "../access.role.service";
import {Resources} from "../resources";
import {ResourcePermission} from "../resource.permission";
import {Grant} from "../grant";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";

@Component({
  selector: 'access-role-creation',
  templateUrl: './access.role.creation.component.html',
  styleUrls: ['./access.role.creation.component.css']
})
export class AccessRoleCreationComponent implements OnInit {

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

  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  private _accessRoleForm: FormGroup;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.prohibitionIndicator = new FormControl(false);
    this.name = new FormControl("", [Validators.required]);
    this.accessRoleTypeId = new FormControl("", [Validators.required]);
    this.effectiveDate = new FormControl( this.getDateString(new Date()), [Validators.required]);
    this.untilDate = new FormControl(this.getDateString(new Date( new Date().getTime() + (2678400000 * 6))), [Validators.required]);
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
    this.getResources();
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
    this.findAccessRoleTypeId("");
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

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addAccessRole(this.accessRole, this.grants)
      .subscribe( accessRole => {
        if (accessRole.accessRoleId) {
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
