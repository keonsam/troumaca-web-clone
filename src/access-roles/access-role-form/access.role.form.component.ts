import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccessRole} from '../access.role';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessRoleService} from '../access.role.service';
import {Resources} from '../resources';
import {Grant} from '../grant';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-access-role-form',
  templateUrl: './access.role.form.component.html',
  styleUrls: ['./access.role.form.component.css']
})
export class AccessRoleFormComponent implements OnInit {

  prohibitionIndicator: FormControl;
  name: FormControl;
  effectiveDate: FormControl;
  untilDate: FormControl;
  description: FormControl;
  accessRoleTypeId: FormControl;
  // accessRoleTypeDataService: CompleterData;
  accessRoleForm: FormGroup;

  doNotDisplayFailureMessage: boolean;
  accessRoleExist = false;

  resources: Resources;
  grants: Grant[];

  private accessRole: AccessRole;

  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private pageSize = 15;

  constructor(private accessRoleService: AccessRoleService,
              // private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.prohibitionIndicator = new FormControl(false);
    this.name = new FormControl('', [Validators.required]);
    this.accessRoleTypeId = new FormControl('', [Validators.required]);
    this.effectiveDate = new FormControl( '', [Validators.required]);
    this.untilDate = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.accessRoleForm = formBuilder.group({
      'prohibitionIndicator': this.prohibitionIndicator,
      'name': this.name,
      'accessRoleTypeId': this.accessRoleTypeId,
      'effectiveDate': this.effectiveDate,
      'untilDate': this.untilDate,
      'description': this.description
    });

    this.accessRoleForm
      .valueChanges
      .subscribe( value => {
        this.accessRole.prohibitionIndicator = value.prohibitionIndicator;
        this.accessRole.name = value.name;
        this.accessRole.effectiveDate = value.effectiveDate;
        this.accessRole.untilDate = value.untilDate;
        this.accessRole.description = value.description;
      });

    this.accessRole = new AccessRole();

    const newResources = new Resources();
    newResources.resources = [];
    newResources.page = new Page();
    newResources.sort = new Sort();
    this.resources = newResources;

    this.grants = [];
    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {

    this.populateAccessRoleTypeDropDown();
    if (this.route.snapshot && this.route.snapshot.data['accessRoleRes']) {
      this.setInputValues(this.route.snapshot.data['accessRoleRes']);
    }
    this.getResources();
  }

  private setInputValues(accessRole: AccessRole) {
    this.prohibitionIndicator.setValue(accessRole.prohibitionIndicator);
    this.name.setValue(accessRole.name);
    this.accessRoleTypeId.setValue(accessRole.accessRoleType ? accessRole.accessRoleType.name : '');
    this.effectiveDate.setValue(accessRole.effectiveDate);
    this.untilDate.setValue(accessRole.untilDate);
    this.description.setValue(accessRole.description);
    this.accessRole = accessRole;
    this.grants = accessRole.grants;
    this.accessRoleExist = true;
  }

  private getResources() {
    this.accessRoleService.getResources(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(values => {
       this.resources = values;
      }, onError => {
        console.log(onError);
      });
  };

  private populateAccessRoleTypeDropDown() {
    this.findAccessRoleTypeId('');
    this.accessRoleForm.get('accessRoleTypeId').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAccessRoleTypeId(value);
      });
  }

  private findAccessRoleTypeId(value) {
    this.accessRoleService
      .findAccessRoleTypeId(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            accessRoleTypeId: v2.accessRoleTypeId,
            name: v2.name,
          };
        })
      }))
      .subscribe(next => { // update the data
        // this.accessRoleTypeDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findAccessRoleType error - ' + error);
      });
  }

  onPermissionsChange(event, resourcePermissionId: string) {
    if (event.target.checked) {
      this.grants.push(new Grant(resourcePermissionId));
    }else {
      this.grants = this.grants.filter(value => {
        return value.resourcePermissionId !== resourcePermissionId;
      });
    }
  }

  isChecked(resourcePermissionId) {
    return this.grants.find(x => x.resourcePermissionId === resourcePermissionId) ? true : false;
  }

  onRequestPage(pageNumber: number) {
    this.defaultPage = pageNumber;
    this.getResources();
  }

  // onAccessRoleTypeSelect(selected: CompleterItem) {
  //   if (selected) {
  //     this.accessRole.accessRoleTypeId = selected.originalObject.accessRoleTypeId;
  //   }
  // }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addAccessRole(this.accessRole, this.grants)
      .subscribe( accessRole => {
        if (accessRole.accessRoleId) {
          this.router.navigate(['/access-roles/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
    this.grants.forEach(value => {
      value.accessRoleId = this.accessRole.accessRoleId;
    });
    this.accessRoleService.updateAccessRole(this.accessRole, this.grants)
      .subscribe( numUpdated => {
        if (numUpdated) {
          this.router.navigate(['/access-roles/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/access-roles/listing']);
  }

}
