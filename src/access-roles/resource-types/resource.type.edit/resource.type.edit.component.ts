import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ResourceType} from "../../resource.type";
import {AccessRoleService} from "../../access.role.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'resource-type-edit',
  templateUrl: './resource.type.edit.component.html',
  styleUrls: ['./resource.type.edit.component.css']
})
export class ResourceTypeEditComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private resourceType: ResourceType;
  private resourceTypeId: string;
  private sub: any;
  private _resourceTypeForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.resourceTypeForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.resourceType = new ResourceType();

    this.resourceTypeForm
      .valueChanges
      .subscribe(value => {
        this.resourceType.name = value.name;
        this.resourceType.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.resourceTypeId = params['resourceTypeId'];
      this.accessRoleService.getResourceTypeById(this.resourceTypeId)
        .subscribe(resourceType => {
          this.name.setValue(resourceType.name);
          this.description.setValue(resourceType.description);
          this.resourceType = resourceType;
        }, error => {
          console.log(error);
        }, () => {
          console.log("complete");
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

  get resourceTypeForm(): FormGroup {
    return this._resourceTypeForm;
  }

  set resourceTypeForm(value: FormGroup) {
    this._resourceTypeForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.updateResourceType(this.resourceType)
      .subscribe( resourceType => {
        if (resourceType) {
          this.router.navigate(['/access-roles/resource-types']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/resource-types']);
  }

}
