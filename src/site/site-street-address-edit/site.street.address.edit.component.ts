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
  private _streetNumber: FormControl;
  private _street: FormControl;

  private _siteStreetAddressEditForm: FormGroup;

  private streetAddress: StreetAddress;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.streetNumber = new FormControl("");

     this.street = new FormControl("", [Validators.required]);

     this.siteStreetAddressEditForm = formBuilder.group({
       "streetNumber": this.streetNumber,
       "street": this.street
     });

     this.streetAddress = new StreetAddress();

     this.siteStreetAddressEditForm
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
    this.sub = this.route.params.subscribe(params => {
       this.siteId = params['siteId'];
       this.siteService.getStreetAddress(this.siteId)
       .subscribe(streetAddress =>{
        this.streetNumber.setValue(streetAddress.streetNumber);
        this.street.setValue(streetAddress.street);
        this.streetAddress = streetAddress;
      }, error => {
        console.log(error);
      }, () => {
        this.siteStreetAddressEditForm
        .valueChanges
        .subscribe(value => {
          this.streetAddress.streetNumber = value.streetNumber;
          this.streetAddress.street = value.street;
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
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
