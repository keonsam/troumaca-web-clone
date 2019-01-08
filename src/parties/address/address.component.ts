import {Component, Input, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PartyService} from "../party.service";
import {Router} from "@angular/router";
import {Address} from "./address";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  streetNumber: FormControl;
  streetName: FormControl;
  postCode: FormControl;
  stateOrProvince: FormControl;
  city: FormControl;
  country: FormControl;
  description: FormControl;
  addressForm: FormGroup;

  doNotDisplayFailureMessage = true;
  errorMessage: string;
  type2 = false;

  @Input() type: string;

  private address: Address;

  constructor(private formBuilder: FormBuilder,
              private partyService: PartyService,
              private router: Router) {
    this.address = new Address();
    this.streetNumber = new FormControl('', [Validators.required]);
    this.streetName = new FormControl('', [Validators.required]);
    this.postCode = new FormControl('', [Validators.required]);
    this.stateOrProvince = new FormControl('', [Validators.required]);
    this.city = new FormControl('', [Validators.required]);
    this.country = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.addressForm = formBuilder.group({
      'streetNumber': this.streetNumber,
      'streetName': this.streetName,
      'postCode': this.postCode,
      'stateOrProvince': this.stateOrProvince,
      'city': this.city,
      'country': this.country,
      'description': this.description
    });

    this.addressForm.valueChanges
      .subscribe( value => {
        this.address.streetNumber = value.streetNumber;
        this.address.streetName = value.streetName;
        this.address.postCode = value.postCode;
        this.address.stateOrProvince = value.stateOrProvince;
        this.address.city = value.city;
        this.address.country = value.country;
        this.address.description = value.description;
      });
  }

  ngOnInit(): void {
    this.partyService.getAddress(this.type)
      .subscribe( address => {
        if (address && address.siteId) {
          this.streetNumber.setValue(address.streetNumber);
          this.streetName.setValue(address.streetName);
          this.postCode.setValue(address.postCode);
          this.stateOrProvince.setValue(address.stateOrProvince);
          this.city.setValue(address.city);
          this.country.setValue(address.country);
          this.description.setValue(address.description);
          this.address = address;
          this.type2 = true;
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Failed to get address. Please refresh.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  onCreate(): void {
    this.partyService.addAddress(this.type, this.address)
      .subscribe( address => {
        if (address && address.siteId) {
          this.router.navigate(['/lobby']);
        } else {
          this.errorMessage = 'Failed to add address. Try again.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.errorMessage = 'Failed to add address. Try again.';
        this.doNotDisplayFailureMessage = false;
      })
  }

  onUpdate(): void {
    this.partyService.updateAddress(this.type, this.address)
      .subscribe( num => {
        if (num) {
          this.router.navigate(['/lobby']);
        } else {
          this.errorMessage = 'Failed to update address. Try again.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.errorMessage = 'Failed to update address. Try again.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel(): void {
    this.router.navigate(['/lobby']);
  }

}
