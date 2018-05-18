import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Permission} from "../../permission";
import {AccessRoleService} from "../../access.role.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'permission-edit',
  templateUrl: './permission.edit.component.html',
  styleUrls: ['./permission.edit.component.css']
})
export class PermissionEditComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private permission: Permission;
  private permissionId: string;
  private sub: any;
  private _permissionForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.permissionForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.permission = new Permission();

    this.permissionForm
      .valueChanges
      .subscribe(value => {
        this.permission.name = value.name;
        this.permission.description = value.description;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;
  }


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.permissionId = params['permissionId'];
      this.accessRoleService.getPermissionById(this.permissionId)
        .subscribe(permission => {
          this.name.setValue(permission.name);
          this.description.setValue(permission.description);
          this.permission = permission;
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

    this.accessRoleService.updatePermission(this.permission)
      .subscribe( permission => {
        if (permission) {
          this.router.navigate(['/access-roles/permissions']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/permissions']);
  }

}
