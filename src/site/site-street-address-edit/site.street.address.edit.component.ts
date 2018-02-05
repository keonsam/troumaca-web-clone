import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StreetAddress} from "../street.address";
import {SiteService} from "../site.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'site-street-address-edit ',
  templateUrl: './site.street.address.edit.component.html',
  styleUrls: ['./site.street.address.edit.component.css']
})
export class SiteStreetAddressEditComponent implements OnInit {

  private siteId: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;
  private _streetNumber: FormControl;
  private _street: FormControl;
  private _city: FormControl;
  private _stateOrProvince: FormControl;
  private _postalCode: FormControl;
  private _country: FormControl;

  private _siteStreetAddressEditForm: FormGroup;

  private streetAddress: StreetAddress;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.name = new FormControl("", [Validators.required]);
     this.description = new FormControl("");
     this.streetNumber = new FormControl("");
     this.street = new FormControl("", [Validators.required]);
     this.city = new FormControl("", [Validators.required]);
     this.stateOrProvince = new FormControl("", [Validators.required]);
     this.postalCode = new FormControl("", [Validators.required]);
     this.country = new FormControl("", [Validators.required]);


     this.siteStreetAddressEditForm = formBuilder.group({
       "name": this.name,
       "description": this.description,
       "streetNumber": this.streetNumber,
       "street": this.street,
       "city": this.city,
       "stateOrProvince": this.stateOrProvince,
       "postalCode": this.postalCode,
       "country": this.country
     });

     this.streetAddress = new StreetAddress();

     this.siteStreetAddressEditForm
     .valueChanges
     .subscribe(value => {
       this.setStreetAddressValue(value);
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.siteId = params['siteId'];
       this.siteService.getStreetAddress(this.siteId)
       .subscribe(streetAddress =>{
        this.name.setValue(streetAddress.name);
        this.description.setValue(streetAddress.description);
        this.streetNumber.setValue(streetAddress.streetNumber);
        this.street.setValue(streetAddress.street);
        this.city.setValue(streetAddress.city);
        this.stateOrProvince.setValue(streetAddress.stateOrProvince);
        this.postalCode.setValue(streetAddress.postalCode);
        this.country.setValue(streetAddress.country);
        this.streetAddress = streetAddress;
      }, error => {
        console.log(error);
      }, () => {
        this.siteStreetAddressEditForm
        .valueChanges
        .subscribe(value => {
          this.setStreetAddressValue(value);
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
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

  get stateOrProvince() : FormControl {
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
  
  get siteStreetAddressEditForm(): FormGroup {
    return this._siteStreetAddressEditForm;
  }

  set siteStreetAddressEditForm(value: FormGroup) {
    this._siteStreetAddressEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  setStreetAddressValue(value) {
    this.streetAddress.name = value.name;
    this.streetAddress.description = value.description;
    this.streetAddress.streetNumber = value.streetNumber;
    this.streetAddress.street = value.street;
    this.streetAddress.city = value.city;
    this.streetAddress.stateOrProvince = value.stateOrProvince;
    this.streetAddress.postalCode = value.postalCode;
    this.streetAddress.country = value.country;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
    .updateStreetAddress(this.siteId, this.streetAddress)
    .subscribe(value => {
      if (value) {
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
