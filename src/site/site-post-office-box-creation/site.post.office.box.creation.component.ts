import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostOfficeBox} from "../post.office.box";
import {SiteService} from "../site.service";
import {Router} from "@angular/router";

@Component({
  selector: 'site-post-office-box-creation',
  templateUrl: './site.post.office.box.creation.component.html',
  styleUrls: ['./site.post.office.box.creation.component.css']
})
export class SitePostOfficeBoxCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private _postOfficeBoxNumber: FormControl;
  private _city: FormControl;
  private _stateOrProvince: FormControl;
  private _postalCode: FormControl;
  private _country: FormControl;

  private _sitePostOfficeBoxForm: FormGroup;

  private postOfficeBox: PostOfficeBox;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {

     this.name = new FormControl("", [Validators.required]);
     this.description = new FormControl("");
     this.postOfficeBoxNumber = new FormControl("", [Validators.required]);
     this.city = new FormControl("", [Validators.required]);
     this.stateOrProvince = new FormControl("", [Validators.required]);
     this.postalCode = new FormControl("", [Validators.required]);
     this.country = new FormControl("", [Validators.required]);

     this.sitePostOfficeBoxForm = formBuilder.group({
       "name": this.name,
       "description": this.description,
       "postOfficeBoxNumber": this.postOfficeBoxNumber,
       "city": this.city,
       "stateOrProvince": this.stateOrProvince,
       "postalCode": this.postalCode,
       "country": this.country
     });

     this.postOfficeBox = new PostOfficeBox();

     this.sitePostOfficeBoxForm
     .valueChanges
     .subscribe(value => {
       this.postOfficeBox.name = value.name;
       this.postOfficeBox.description = value.description;
       this.postOfficeBox.postOfficeBoxNumber = value.postOfficeBoxNumber;
       this.postOfficeBox.city = value.city;
       this.postOfficeBox.stateOrProvince = value.stateOrProvince;
       this.postOfficeBox.postalCode = value.postalCode;
       this.postOfficeBox.country = value.country;
       console.log(value);
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

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get postOfficeBoxNumber(): FormControl {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: FormControl) {
    this._postOfficeBoxNumber = value
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

  get sitePostOfficeBoxForm(): FormGroup {
    return this._sitePostOfficeBoxForm;
  }

  set sitePostOfficeBoxForm(value: FormGroup) {
    this._sitePostOfficeBoxForm = value;
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
    .addPostOfficeBox(this.postOfficeBox)
    .subscribe(value => {
      if (value && value.siteId) {
        this.router.navigate(['/sites/post-office-boxes']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/post-office-boxes']);
  }

}
