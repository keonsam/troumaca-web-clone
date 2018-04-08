import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';

import {Resource} from "../../resource";
import {ResourceType} from "../../resource.type";
import {AccessRoleService} from "../../access.role.service";
import {Router} from "@angular/router";

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

  private _resourceTypeIdDataService: CompleterData;

  private _resourceForm: FormGroup;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.resourceTypeId = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.resourceForm = formBuilder.group({
      "name": this.name,
      "resourceTypeId": this.resourceTypeId,
      "description": this.description
    });

    this.resourceForm
      .valueChanges
      .subscribe(value => {
        this.resource.name = value.name;
        this.resource.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.resource = new Resource();
    this.resource.resourceType = new ResourceType();

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.populateResourceTypeIdDropDown();
  }

  private populateResourceTypeIdDropDown() {
    this.resourceTypeIdDataService = this.completerService.local([], 'name', 'name');
    let that = this;
    this.resourceForm.get("resourceTypeId").valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.accessRoleService
          .findResourceTypeId(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.map(v2 => {
              return {
                resourceTypeId: v2.resourceTypeId,
                name: v2.name,
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findResourceTypeId next - " + next);
            this.resourceTypeIdDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findResourceTypeId error - " + error);
          });
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
      this.resource.resourceType = selected.originalObject;
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addResource(this.resource)
      .subscribe( resource => {
        if (resource.resourceId) {
          this.router.navigate(['/access-roles/resources/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/resources/listing']);
  }

}
