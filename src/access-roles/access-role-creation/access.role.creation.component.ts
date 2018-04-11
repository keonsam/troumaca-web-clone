import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessRole} from "../access.role";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Router} from "@angular/router";
import {AccessRoleService} from "../access.role.service";

@Component({
  selector: 'access-role-creation',
  templateUrl: './access.role.creation.component.html',
  styleUrls: ['./access.role.creation.component.css']
})
export class AccessRoleCreationComponent implements OnInit {

  private _prohibitionIndicator: FormControl;
  private _name: FormControl;
  private _effectiveDate: FormControl;
  private _untilDate: FormControl;
  private _description: FormControl;

  private accessRole: AccessRole;

  private _accessRoleForm: FormGroup;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private accessRoleService: AccessRoleService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.prohibitionIndicator = new FormControl(false);
    this.name = new FormControl("", [Validators.required]);
    this.effectiveDate = new FormControl( this.getDateString(new Date()), [Validators.required]);
    this.untilDate = new FormControl(this.getDateString(new Date( new Date().getTime() + (2678400000 * 6))), [Validators.required]);
    this.description = new FormControl("");

    this.accessRoleForm = formBuilder.group({
      "prohibitionIndicator": this.prohibitionIndicator,
      "name": this.name,
      "effectiveDate": this.effectiveDate,
      "untilDate": this.untilDate,
      "description": this.description
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
    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
  }

  getDateString(date: Date) {
    return date.toISOString().substring(0,10);
  }
  get prohibitionIndicator(): FormControl {
    return this._prohibitionIndicator;
  }

  set prohibitionIndicator(value: FormControl) {
    this._prohibitionIndicator = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get effectiveDate(): FormControl {
    return this._effectiveDate;
  }

  set effectiveDate(value: FormControl) {
    this._effectiveDate = value;
  }

  get untilDate(): FormControl {
    return this._untilDate;
  }

  set untilDate(value: FormControl) {
    this._untilDate = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get accessRoleForm(): FormGroup {
    return this._accessRoleForm;
  }

  set accessRoleForm(value: FormGroup) {
    this._accessRoleForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.accessRoleService.addAccessRole(this.accessRole)
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

  cancel() {
    this.router.navigate(['/access-roles/listing']);
  }

}
