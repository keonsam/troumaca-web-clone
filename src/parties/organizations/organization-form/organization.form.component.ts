import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {OrganizationService} from "../organization.service";

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization.form.component.html',
  styleUrls: ['./organization.form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  private _purpose: FormControl;
  private _name: FormControl;
  private _description: FormControl;

  private _organizationForm: FormGroup;

  private organization: Organization;
  public organizationExist = false;

  private _doNotDisplayFailureMessage: boolean;
  @Input() profile: boolean;
  @Output() organizationNameEvent = new EventEmitter<string>();
  @Input() stepper: boolean;
  @Output() organizationCreated = new EventEmitter<boolean>();

  constructor(private organizationService: OrganizationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

   this.organization = new Organization();

   this.purpose = new FormControl('', [Validators.required]);
   this.name = new FormControl('', [Validators.required]);
   this.description = new FormControl('');

   this.organizationForm = formBuilder.group({
     'purpose': this.purpose,
     'name': this.name,
     'description': this.description

   });

   this.organizationForm.valueChanges
   .subscribe(value => {
     if (this.organization.name !== value.name) {
       this.organizationNameEvent.emit(value.name);
     }
     this.organization.purpose = value.purpose;
     this.organization.name = value.name;
     this.organization.description = value.description;
   }, error2 => {
     console.log(error2);
   });

   this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['organization']) {
      this.setInputValues(this.route.snapshot.data['organization']);
    } else if (this.profile) {
      this.organizationService.getOrganization('company')
        .subscribe( value => {
          this.setInputValues(value);
        });
    }
  }
  
  private setInputValues(organization: Organization) {
    this.purpose.setValue(organization.purpose);
    this.name.setValue(organization.name);
    this.description.setValue(organization.description);
    this.organizationNameEvent.emit(organization.name);
    this.organization = organization;
    this.organizationExist = true;
  }

  get purpose(): FormControl {
    return this._purpose;
  }

  set purpose(value: FormControl) {
    this._purpose = value;
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

  get organizationForm(): FormGroup {
    return this._organizationForm;
  }

  set organizationForm(value: FormGroup) {
    this._organizationForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationService
      .addOrganization(this.organization, this.stepper ? 'company' : undefined)
      .subscribe(value => {
        if (value && value.partyId) {
          if (this.stepper) {

            this.organizationCreated.emit(true);
          }else {
            this.router.navigate(['/parties/organizations/listing']);
          }
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationService
      .updateOrganization(this.organization)
      .subscribe(value => {
        if (value) {
          if (this.stepper) {
            this.organizationCreated.emit(true);
          }else {
            this.router.navigate(['/parties/organizations/listing']);
          }
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

    cancel() {
      this.router.navigate(['/parties/organizations/listing']);
    }

}
