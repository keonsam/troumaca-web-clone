import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Resource} from "../../resource";
import {AccessRoleService} from "../../access.role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'resource-creation',
  templateUrl: './resource.creation.component.html',
  styleUrls: ['./resource.creation.component.css']
})
export class ResourceCreationComponent implements OnInit {
  private _name: FormControl;
  private _description: FormControl;
  private resource: Resource;

  private _resourceForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.resourceForm = formBuilder.group({
      "name": this.name,
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

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {

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
