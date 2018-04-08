import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';

import {Resource} from "../../resource";
import {AccessRoleService} from "../../access.role.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ResourceType} from "../../resource.type";

@Component({
  selector: 'resource-edit',
  templateUrl: './resource.edit.component.html',
  styleUrls: ['./resource.edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  private _name: FormControl;
  private _resourceTypeId: FormControl;
  private _description: FormControl;

  private _resourceTypeIdDataService: CompleterData;

  private resource: Resource;
  private resourceId: string;
  private sub: any;
  private _resourceForm: FormGroup;

  private pageSize:number = 15;
  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.resourceTypeId = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.resourceForm = formBuilder.group({
      "name": this.name,
      "resourceTypeId": this.resourceTypeId,
      "description": this.description
    });

    this.resource = new Resource();
    this.resource.resourceType = new ResourceType();

    this.resourceForm
      .valueChanges
      .subscribe(value => {
        this.resource.name = value.name;
        this.resource.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.resourceId = params['resourceId'];
      this.accessRoleService.getResourceById(this.resourceId)
        .subscribe(resource => {
          this.name.setValue(resource.name);
          this.resourceTypeId.setValue(resource.resourceType.name);
          this.description.setValue(resource.description);
          this.resource = resource;
        }, error => {
          console.log(error);
        }, () => {
          console.log("complete");
        });
    });
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

    this.accessRoleService.updateResource(this.resource)
      .subscribe( resource => {
        if (resource) {
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
