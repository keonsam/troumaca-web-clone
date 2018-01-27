import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../site.service";
import {SignUpService} from "../../sign-up/sign.up.service";

@Component({
  selector: 'site-phone-creation',
  templateUrl: './site.phone.creation.component.html',
  styleUrls: ['./site.phone.creation.component.css']
})
export class SitePhoneCreationComponent implements OnInit {

  private _countryCode:FormControl;
  private _areaCode:FormControl;
  private _exchange:FormControl;
  private _telephoneNumber:FormControl;
  private _extension:FormControl;
  private _sitePhoneForm:FormGroup;

  constructor(private siteService:SiteService, private formBuilder: FormBuilder) {
    this.countryCode = new FormControl("", [
      Validators.required
    ]);
    this.areaCode = new FormControl("", [
      Validators.required
    ]);
    this.exchange = new FormControl("");
    this.telephoneNumber = new FormControl("", Validators.required);
    this.extension = new FormControl("");

    this.sitePhoneForm = formBuilder.group({
      "countryCode": this.countryCode,
      "areaCode": this.areaCode,
      "exchange": this.exchange,
      "telephoneNumber": this.telephoneNumber,
      "extension": this.extension,
    });

    this.areaCode.statusChanges.subscribe(value => {
      console.log(value)
    }, error2 => {
      console.log(error2);
    });

    this.sitePhoneForm.valueChanges.subscribe(value => {
      console.log(value);
    }, error2 => {
      console.log(error2);
    })
  }

  ngOnInit(): void {
  }

  // Validators
  isValidCountryCode() {
    let that = this;
    return (c:FormControl) => {
      return that.isCountryCode(c.value) ? null : {
        validateEmail: {
          valid: false
        }
      };
    };
  }

  isCountryCode(value) {
    /^[0-9]{3}$/.test(value)
  }

  // Field
  get countryCode(): FormControl {
    return this._countryCode;
  }

  set countryCode(value: FormControl) {
    this._countryCode = value;
  }

  get areaCode(): FormControl {
    return this._areaCode;
  }

  set areaCode(value: FormControl) {
    this._areaCode = value;
  }

  get exchange(): FormControl {
    return this._exchange;
  }

  set exchange(value: FormControl) {
    this._exchange = value;
  }

  get telephoneNumber(): FormControl {
    return this._telephoneNumber;
  }

  set telephoneNumber(value: FormControl) {
    this._telephoneNumber = value;
  }

  get extension(): FormControl {
    return this._extension;
  }

  set extension(value: FormControl) {
    this._extension = value;
  }

  get sitePhoneForm(): FormGroup {
    return this._sitePhoneForm;
  }

  set sitePhoneForm(value: FormGroup) {
    this._sitePhoneForm = value;
  }

  enableSubmit():boolean {
    return false;
  }

  onCreate() {
  }

  cancel() {
  }
  
  private isPhoneNumber() {
    let value = this.countryCode.value;
    this.areaCode.value
  }

}