import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {AccessRoleService} from '../../access.role.service';
import {AccessRoleType} from '../../access.role.type';

@Component({
  selector: 'app-access-role-type-form',
  templateUrl: './access.role.type.form.component.html',
  styleUrls: ['./access.role.type.form.component.css']
})
export class AccessRoleTypeFormComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;

  private accessRoleType: AccessRoleType;
  public accessRoleTypeExist = false;

  private _accessRoleTypeForm: FormGroup;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.accessRoleTypeForm = formBuilder.group({
      'name': this.name,
      'description': this.description
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
    if (this.route.snapshot && this.route.snapshot.data['accessRoleType']) {
      this.setInputValues(this.route.snapshot.data['accessRoleType']);
    }
  }

  private setInputValues(accessRoleType: AccessRoleType) {
    this.name.setValue(accessRoleType.name);
    this.description.setValue(accessRoleType.description);
    this.accessRoleTypeExist = true;
    this.accessRoleType = accessRoleType;
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
      .subscribe( value => {
        if (value.accessRoleTypeId) {
          this.router.navigate(['/access-roles/access-role-types']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }


  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.updateAccessRoleType(this.accessRoleType)
      .subscribe( numUpdated => {
        if (numUpdated) {
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
