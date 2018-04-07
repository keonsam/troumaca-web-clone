import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Permission} from "../../permission";
import {AccessRoleService} from "../../access.role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'permission-creation',
  templateUrl: './permission.creation.component.html',
  styleUrls: ['./permission.creation.component.css']
})
export class PermissionCreationComponent implements OnInit {
  private _name: FormControl;
  private _description: FormControl;
  private permission: Permission;

  private _permissionForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.permissionForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.permissionForm
      .valueChanges
      .subscribe(value => {
        this.permission.name = value.name;
        this.permission.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.permission = new Permission();

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

  get permissionForm(): FormGroup {
    return this._permissionForm;
  }

  set permissionForm(value: FormGroup) {
    this._permissionForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addPermission(this.permission)
      .subscribe( permission => {
        if (permission.permissionId) {
          this.router.navigate(['/access-roles/permissions/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/permissions/listing']);
  }

}
