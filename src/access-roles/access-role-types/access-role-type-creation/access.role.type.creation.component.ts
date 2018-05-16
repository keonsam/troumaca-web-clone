import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessRoleType} from "../../access.role.type";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Router} from "@angular/router";
import {AccessRoleService} from "../../access.role.service";

@Component({
  selector: 'access-role-type-creation',
  templateUrl: './access.role.type.creation.component.html',
  styleUrls: ['./access.role.type.creation.component.css']
})
export class AccessRoleTypeCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;

  private accessRoleType: AccessRoleType;

  private _accessRoleTypeForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.accessRoleTypeForm = formBuilder.group({
      "name": this.name,
      "description": this.description
    });

    this.accessRoleTypeForm
      .valueChanges
      .subscribe( value => {
        this.accessRoleType.name = value.name;
        this.accessRoleType.description = value.description;
      });

    this.accessRoleType = new AccessRoleType();
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

  get accessRoleTypeForm(): FormGroup {
    return this._accessRoleTypeForm;
  }

  set accessRoleTypeForm(value: FormGroup) {
    this._accessRoleTypeForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addAccessRoleType(this.accessRoleType)
      .subscribe( accessRoleType => {
        if (accessRoleType.accessRoleTypeId) {
          this.router.navigate(['/access-roles/access-role-types']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/access-role-types']);
  }

}
