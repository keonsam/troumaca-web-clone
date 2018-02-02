import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StreetAddress} from "../street.address";
import {SiteService} from "../site.service";
import {Router} from "@angular/router";

@Component({
  selector: 'site-street-address-creation',
  templateUrl: './site.street.address.creation.component.html',
  styleUrls: ['./site.street.address.creation.component.css']
})
export class SiteStreetAddressCreationComponent implements OnInit {

  private _streetNumber: FormControl;
  private _street: FormControl;

  private _siteStreetAddressForm: FormGroup;

  private streetAddress: StreetAddress;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {

     this.streetNumber = new FormControl("");

     this.street = new FormControl("", [Validators.required]);

     this.siteStreetAddressForm = formBuilder.group({
       "streetNumber": this.streetNumber,
       "street": this.street
     });

     this.streetAddress = new StreetAddress();

     this.siteStreetAddressForm
     .valueChanges
     .subscribe(value => {
       this.streetAddress.streetNumber = value.streetNumber;
       this.streetAddress.street = value.street;
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
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
