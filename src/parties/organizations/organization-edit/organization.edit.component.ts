import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {PartyEventService} from '../../party.event.service';
import {PartyService} from '../../party.service';

@Component({
  selector: 'organization-edit',
  templateUrl: './organization.edit.component.html',
  styleUrls: ['./organization.edit.component.css']
})
export class OrganizationEditComponent implements OnInit {

  private partyId: string;
  private sub: any;
  private _purpose: FormControl;
  private _name: FormControl;
  private _description: FormControl;

  private _organizationEditForm: FormGroup;

  private organization: Organization;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router){

   this.organization = new Organization();

   this.purpose = new FormControl('', [Validators.required]);
   this.name = new FormControl('', [Validators.required/*, this.organizationNameValidator(authenticationService)*/]);
   this.description = new FormControl('');

   this.organizationEditForm = formBuilder.group({
     'purpose': this.purpose,
     'name': this.name,
     'description': this.description

   });

   this.organizationEditForm.valueChanges
   .subscribe(value => {
     this.organization.purpose = value.purpose;
     this.organization.name = value.name;
     this.organization.description = value.description;
   }, error2 => {
     console.log(error2);
   });

   this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.partyId = params['partyId'];
       this.partyService.getOrganization(this.partyId)
       .subscribe(organization => {
        this.purpose.setValue(organization.purpose);
        this.name.setValue(organization.name);
         this.description.setValue(organization.description);
         this.organization = organization;
      }, error => {
        console.log(error);
      });
    });
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

  get organizationEditForm(): FormGroup {
    return this._organizationEditForm;
  }

  set organizationEditForm(value: FormGroup) {
    this._organizationEditForm = value;
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
        .updateOrganization(this.organization)
        .subscribe(value => {
          if (value) {
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
