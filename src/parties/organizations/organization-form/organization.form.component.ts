import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {OrganizationService} from '../organization.service';
import {SessionService} from "../../../session/session.service";
import { StreetAddress} from "../../../site/street.address";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {ValidResponse} from "../../../authentication/valid.response";

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization.form.component.html',
  styleUrls: ['./organization.form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  purpose: FormControl;
  name: FormControl;
  email: FormControl;
  number: FormControl;
  streetName: FormControl;
  streetNumber: FormControl;
  city: FormControl;
  stateOrProvince: FormControl;
  postalCode: FormControl;
  country: FormControl;
  description: FormControl;

  organizationForm: FormGroup;

  private organization: Organization;
  organizationExist = false;

  doNotDisplayFailureMessage: boolean;
  @Input() profile: boolean;
  @Output() organizationNameEvent = new EventEmitter<string>();


  constructor(private organizationService: OrganizationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService
              // private mapsAPILoader: MapsAPILoader,
              // private ngZone: NgZone
              ) {

    this.organization = new Organization();
    this.organization.streetAddress = new StreetAddress();

    this.purpose = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, this.usernameValidator(this.organizationService)]);
    this.number = new FormControl('', [Validators.required, this.usernameValidator(this.organizationService)]);
    this.streetName = new FormControl('', [Validators.required]);
    this.streetNumber = new FormControl('', [Validators.required]);
    this.city = new FormControl('', [Validators.required]);
    this.stateOrProvince = new FormControl('', [Validators.required]);
    this.postalCode = new FormControl('', [Validators.required]);
    this.country = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.organizationForm = formBuilder.group({
      'purpose': this.purpose,
      'name': this.name,
      'email': this.email,
      'number': this.number,
      'streetNumber': this.streetNumber,
      'streetName': this.streetName,
      'city': this.city,
      'stateOrProvince': this.stateOrProvince,
      'postalCode': this.postalCode,
      'country': this.country,
      'description': this.description
    });

    this.organizationForm.valueChanges
      .subscribe(value => {
        if (this.organization.name !== value.name) {
          this.organizationNameEvent.emit(value.name);
        }
        this.organization.name = value.name;
        this.organization.purpose = value.purpose;
        this.organization.email = value.email;
        this.organization.number = value.number;
        this.organization.streetAddress.streetNumber = value.streetNumber;
        this.organization.streetAddress.streetName = value.streetName;
        this.organization.streetAddress.city = value.city;
        this.organization.streetAddress.stateOrProvince = value.stateOrProvince;
        this.organization.streetAddress.postalCode = value.postalCode;
        this.organization.streetAddress.country = value.country;
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
      this.organizationService.getOrganization('profile')
        .subscribe(value => {
          if (value) {
            this.setInputValues(value);
          }
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

  private usernameValidator(organizationService: OrganizationService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged(),  filter(value => { // filter out empty values
          return !!(value);
        }), map((value: any) => {
          return organizationService.isValidUsername(value);
        })).subscribe(value => {
        value.subscribe( (otherValue: ValidResponse) => {
          isValidUsername = otherValue.valid;
          usernameControl.updateValueAndValidity();
        });
      });
    };

    return (control: FormControl) => {
      if (!usernameControl) {
        usernameControl = control;
      }

      if (!valueChanges && control.valueChanges) {
        valueChanges = control.valueChanges;
        subscriberToChangeEvents();
      }

      return isValidUsername ? null : {
        validateEmail: true
      };
    }
  }


  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationService
      .addOrganization(this.organization, this.profile || false)
      .subscribe(value => {
        if (value && value.partyId) {
          if (this.profile) {
            this.router.navigate(['/lobby']);
          } else {
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
          if (this.profile) {
            this.sessionService.loginEvent.next(true);
            this.router.navigate(['/lobby']);
          } else {
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
