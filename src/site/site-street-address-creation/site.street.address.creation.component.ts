import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StreetAddress} from '../street.address';
import {SiteService} from '../site.service';
import {Router} from '@angular/router';

@Component({
  selector: 'site-street-address-creation',
  templateUrl: './site.street.address.creation.component.html',
  styleUrls: ['./site.street.address.creation.component.css']
})
export class SiteStreetAddressCreationComponent implements OnInit {

  private _name: FormControl;
  private _suiteOrApartment: FormControl;
  private _floor: FormControl;
  private _suiteOrApartmentNumber: FormControl;
  private _description: FormControl;
  private _streetNumber: FormControl;
  private _street: FormControl;
  private _city: FormControl;
  private _stateOrProvince: FormControl;
  private _postalCode: FormControl;
  private _country: FormControl;

  private _siteStreetAddressForm: FormGroup;

  private streetAddress: StreetAddress;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private siteService: SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {

     this.name = new FormControl('', [Validators.required]);
     this.suiteOrApartment = new FormControl('', [Validators.required]);
     this.floor = new FormControl('', [Validators.required]);
     this.suiteOrApartmentNumber = new FormControl('', [Validators.required]);
     this.description = new FormControl('');
     this.streetNumber = new FormControl('');
     this.street = new FormControl('', [Validators.required]);
     this.city = new FormControl('', [Validators.required]);
     this.stateOrProvince = new FormControl('', [Validators.required]);
     this.postalCode = new FormControl('', [Validators.required]);
     this.country = new FormControl('', [Validators.required]);

     this.siteStreetAddressForm = formBuilder.group({
       'name': this.name,
       'suiteOrApartment': this.suiteOrApartment,
       'floor': this.floor,
       'suiteOrApartmentNumber': this.suiteOrApartmentNumber,
       'description': this.description,
       'streetNumber': this.streetNumber,
       'street': this.street,
       'city': this.city,
       'stateOrProvince': this.stateOrProvince,
       'postalCode': this.postalCode,
       'country': this.country
     });

     this.streetAddress = new StreetAddress();

     this.siteStreetAddressForm
     .valueChanges
     .subscribe(value => {
       this.streetAddress.name = value.name;
       this.streetAddress.suiteOrApartment = value.suiteOrApartment;
       this.streetAddress.floor = value.floor;
       this.streetAddress.suiteOrApartmentNumber = value.suiteOrApartmentNumber;
       this.streetAddress.description = value.description;
       this.streetAddress.streetNumber = value.streetNumber;
       this.streetAddress.street = value.street;
       this.streetAddress.city = value.city;
       this.streetAddress.stateOrProvince = value.stateOrProvince;
       this.streetAddress.postalCode = value.postalCode;
       this.streetAddress.country = value.country;
     }, error2 => {
       console.log(error2);
     });

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

  get suiteOrApartment(): FormControl {
    return this._suiteOrApartment;
  }

  set suiteOrApartment(value: FormControl) {
    this._suiteOrApartment = value;
  }

  get floor(): FormControl {
    return this._floor;
  }

  set floor(value: FormControl) {
    this._floor = value;
  }

  get suiteOrApartmentNumber(): FormControl {
    return this._suiteOrApartmentNumber;
  }

  set suiteOrApartmentNumber(value: FormControl) {
    this._suiteOrApartmentNumber = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get streetNumber(): FormControl {
    return this._streetNumber;
  }

  set streetNumber(value: FormControl) {
    this._streetNumber = value
  }

  get street(): FormControl {
    return this._street;
  }

  set street(value: FormControl) {
    this._street = value;
  }

  get city(): FormControl {
    return this._city;
  }

  set city(value: FormControl) {
    this._city = value;
  }

  get stateOrProvince(): FormControl {
    return this._stateOrProvince;
  }

  set stateOrProvince(value: FormControl) {
    this._stateOrProvince = value;
  }

  get postalCode(): FormControl {
    return this._postalCode;
  }

  set postalCode(value: FormControl) {
    this._postalCode = value;
  }

  get country(): FormControl {
    return this._country;
  }

  set country(value: FormControl) {
    this._country = value;
  }

  get siteStreetAddressForm(): FormGroup {
    return this._siteStreetAddressForm;
  }

  set siteStreetAddressForm(value: FormGroup) {
    this._siteStreetAddressForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
    .addStreetAddress(this.streetAddress)
    .subscribe(value => {
      if (value && value.siteId) {
        this.router.navigate(['/sites/street-addresses']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/street-addresses']);
  }

}
