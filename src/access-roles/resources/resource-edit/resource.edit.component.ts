import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Resource} from "../../resource";
import {AccessRoleService} from "../../access.role.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'resource-edit',
  templateUrl: './resource.edit.component.html',
  styleUrls: ['./resource.edit.component.css']
})
export class ResourceEditComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private resource: Resource;
  private resourceId: string;
  private sub: any;
  private _resourceForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.resourceForm = formBuilder.group({
      "name": this.name,
      "description": this.description
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

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.resourceId = params['resourceId'];
      this.accessRoleService.getResourceById(this.resourceId)
        .subscribe(resource => {
          this.name.setValue(resource.name);
          this.description.setValue(resource.description);
          this.resource = resource;
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
