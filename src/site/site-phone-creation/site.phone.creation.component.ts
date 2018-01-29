import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SiteService} from "../site.service";
import {Phone} from "../phone";
import {Router} from "@angular/router";

@Component({
  selector: 'site-phone-creation',
  templateUrl: './site.phone.creation.component.html',
  styleUrls: ['./site.phone.creation.component.css']
})
export class SitePhoneCreationComponent implements OnInit {

  private _name:FormControl;
  private _countryCode:FormControl;
  private _areaCode:FormControl;
  private _exchange:FormControl;
  private _telephoneNumber:FormControl;
  private _extension:FormControl;
  private _description:FormControl;
  private _removedOn:FormControl;

  private _sitePhoneForm:FormGroup;

  private phone:Phone;

  private _createFailed:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.name = new FormControl("");

    this.countryCode = new FormControl("", [
      Validators.required
    ]);

    this.areaCode = new FormControl("", [
      Validators.required,
      Validators.pattern(/\d{3}/)
    ]);

    this.exchange = new FormControl("");

    this.telephoneNumber = new FormControl("", [
      Validators.required,
      Validators.pattern(/^([0-9]{3})[-. ]?([0-9]{4})$/)
    ]);

    this.extension = new FormControl("");

    this.description = new FormControl("");

    this.removedOn = new FormControl();

    this.sitePhoneForm = formBuilder.group({
      "name": this.name,
      "countryCode": this.countryCode,
      "areaCode": this.areaCode,
      "exchange": this.exchange,
      "telephoneNumber": this.telephoneNumber,
      "extension": this.extension,
      "description": this.description,
      "removedOn": this.removedOn,
    });

    this.phone = new Phone();

    this.sitePhoneForm
    .valueChanges
    .subscribe(value => {
      this.phone.name = value.name;
      this.phone.areaCode = value.areaCode;
      this.phone.countryCode = value.countryCode;
      this.phone.exchange = value.exchange;
      this.phone.telephoneNumber = value.telephoneNumber;
      this.phone.extension = value.extension;
      this.phone.description = value.description;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.createFailed = false;
  }

  ngOnInit(): void {
  }

  // Field
  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

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

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get removedOn(): FormControl {
    return this._removedOn;
  }

  set removedOn(value: FormControl) {
    this._removedOn = value;
  }

  get sitePhoneForm(): FormGroup {
    return this._sitePhoneForm;
  }

  set sitePhoneForm(value: FormGroup) {
    this._sitePhoneForm = value;
  }

  get createFailed(): boolean {
    return this._createFailed;
  }

  set createFailed(value: boolean) {
    this._createFailed = value;
  }

  onCreate() {
    this.siteService
    .addPhone(this.phone)
    .subscribe(value => {
      if (value && value.siteId) {
        this.router.navigate(['/sites/phones']);
      } else {
        this.createFailed = true;
      }
    }, error => {
      console.log(error);
      this.createFailed = true;
    });
  }

  cancel() {
  }

}