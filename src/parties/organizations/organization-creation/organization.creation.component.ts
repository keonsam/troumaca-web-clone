import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {PartyEventService} from '../../party.event.service';
import {PartyService} from '../../party.service';

@Component({
  selector: 'organization-creation',
  templateUrl: './organization.creation.component.html',
  styleUrls: ['./organization.creation.component.css']
})
export class OrganizationCreationComponent implements OnInit {

  private _purpose: FormControl;
  private _name: FormControl;
  private _description: FormControl;

  private _organizationForm: FormGroup;

  private organization: Organization;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private router: Router){

   this.organization = new Organization();

   this.purpose = new FormControl('', [Validators.required]);
   this.name = new FormControl('', [Validators.required/*, this.organizationNameValidator(authenticationService)*/]);
    this.description = new FormControl('');

   this.organizationForm = formBuilder.group({
     'purpose': this.purpose,
     'name': this.name,
     'description': this.description
   });

   this.organizationForm.valueChanges
   .subscribe(value => {
     this.organization.purpose = value.purpose;
     this.organization.name = value.name;
     this.organization.description = value.description;
   }, error2 => {
     console.log(error2);
   });

   this.doNotDisplayFailureMessage = true;
   //this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {
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

        this.partyService
        .addOrganization(this.organization)
        .subscribe(value => {
          if (value && value.partyId) {
            this.router.navigate(['/parties/organizations/listing']);
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
