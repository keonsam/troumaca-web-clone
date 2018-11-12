import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SiteService} from '../site.service';
import {Phone} from '../phone';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-site-phone-form',
  templateUrl: './site.phone.form.component.html',
  styleUrls: ['./site.phone.form.component.css']
})
export class SitePhoneFormComponent implements OnInit {

  name: FormControl;
  countryCode: FormControl;
  areaCode: FormControl;
  exchange: FormControl;
  telephoneNumber: FormControl;
  extension: FormControl;
  description: FormControl;
  removedOn: FormControl;

  sitePhoneForm: FormGroup;

  private phone: Phone;
  phoneExist = false;

  doNotDisplayFailureMessage: boolean;

  constructor(private siteService: SiteService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {

    this.name = new FormControl('');

    this.countryCode = new FormControl('', [
      Validators.required
    ]);

    this.areaCode = new FormControl('', [
      Validators.required,
      Validators.pattern(/\d{3}/)
    ]);

    this.exchange = new FormControl('');

    this.telephoneNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(/^([0-9]{3})[-. ]?([0-9]{4})$/)
    ]);

    this.extension = new FormControl('');

    this.description = new FormControl('');

    this.removedOn = new FormControl();

    this.sitePhoneForm = formBuilder.group({
      'name': this.name,
      'countryCode': this.countryCode,
      'areaCode': this.areaCode,
      'exchange': this.exchange,
      'telephoneNumber': this.telephoneNumber,
      'extension': this.extension,
      'description': this.description,
      'removedOn': this.removedOn,
    });

    this.sitePhoneForm
      .valueChanges
      .subscribe( value => {
        this.phone.name = value.name;
        this.phone.countryCode = value.countryCode;
        this.phone.areaCode = value.areaCode;
        this.phone.telephoneNumber = value.telephoneNumber;
        this.phone.exchange = value.exchange;
        this.phone.extension = value.extension;
        this.phone.description = value.description;
      });

    this.phone = new Phone();

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['phone']) {
      this.setInputValues(this.route.snapshot.data['phone']);
    }
  }

  private setInputValues(phone: Phone) {
    this.name.setValue(phone.name);
    this.countryCode.setValue(phone.countryCode);
    this.areaCode.setValue(phone.areaCode);
    this.exchange.setValue(phone.exchange);
    this.telephoneNumber.setValue(phone.telephoneNumber);
    this.extension.setValue(phone.extension);
    this.description.setValue(phone.description);
    this.removedOn.setValue(phone.removedOn);
    this.phone = phone;
    this.phoneExist = true;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
      .addPhone(this.phone)
      .subscribe(value => {
        if (value && value.siteId) {
          this.router.navigate(['/sites/phones']);
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

    this.siteService
    .updatePhone(this.phone.siteId, this.phone)
    .subscribe(value => {
      if (value) {
        this.router.navigate(['/sites/phones']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/phones']);
  }

}
