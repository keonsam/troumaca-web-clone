import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {Permission} from '../../permission';
import {AccessRoleService} from '../../access.role.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.form.component.html',
  styleUrls: ['./permission.form.component.css']
})
export class PermissionFormComponent implements OnInit {
  name: FormControl;
  description: FormControl;

  permissionForm: FormGroup;

  doNotDisplayFailureMessage: boolean;
  permissionExist= false;

  private permission: Permission;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.permissionForm = formBuilder.group({
      'name': this.name,
      'description': this.description
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
    if (this.route.snapshot && this.route.snapshot.data['permission']) {
      this.setInputValues(this.route.snapshot.data['permission']);
    }
  }

  private setInputValues(permission: Permission) {
    this.name.setValue(permission.name);
    this.description.setValue(permission.description);
    this.permissionExist = true;
    this.permission = permission;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addPermission(this.permission)
      .subscribe( permission => {
        if (permission.permissionId) {
          this.router.navigate(['/access-roles/permissions']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
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
