import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ContactInfo} from './contact.info';
import {PartyService} from '../party.service';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ValidResponse} from '../../authentication/valid.response';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact.info.component.html',
  styleUrls: ['./contact.info.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})

export class ContactInfoComponent implements OnInit {
  email: FormControl;
  phone: FormControl;
  contactInfoForm: FormGroup;
  doNotDisplayFailureMessage = true;
  errorMessage: string;
  update = false;

  contactInfo: ContactInfo;

  @Input() type: string;
  activePane = 'left';

  constructor(private formBuilder: FormBuilder,
              private partyService: PartyService,
              private route: ActivatedRoute) {
    this.contactInfo = new ContactInfo();
    this.email = new FormControl('', [Validators.required, Validators.email, this.usernameValidator(partyService)]);
    this.phone = new FormControl('', [Validators.required, this.usernameValidator(partyService)]);

    this.contactInfoForm = formBuilder.group({
      'email': this.email,
      'phone': this.phone
    });

    this.contactInfoForm.valueChanges
      .subscribe( value => {
      this.contactInfo.email = value.email;
      this.contactInfo.phone = value.phone;
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['contactInfo']) {
      this.setInputValues(this.route.snapshot.data['contactInfo']);
      this.update = true;
    }
  }

  getContactInfo() {
    this.partyService.getContactInfo(this.type)
      .subscribe(value => {
        this.setInputValues(value);
        this.activePane = 'left';
      });
  }
  
  private setInputValues(contactInfo: ContactInfo) {
    this.email.setValue(contactInfo.email);
    this.phone.setValue(contactInfo.phone);
    this.contactInfo = contactInfo;
  }

  private usernameValidator(partyService: PartyService) {
    let usernameControl = null;
    let isValidUsername = false;
    let valueChanges = null;

    const subscriberToChangeEvents = function () {
      valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged(),  filter(value => { // filter out empty values
          return !!(value);
        }), map((value: string) => {
          return partyService.isValidUsername(value.toString());
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

  onCreate(): void {
    this.doNotDisplayFailureMessage = true;
    this.partyService.addContactInfo(this.type, this.contactInfo)
      .subscribe(contactInfo => {
        if (contactInfo) {
          this.activePane = 'left';
        } else {
          this.errorMessage = 'Failed to add contact info.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Failed to add contact info.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate(): void {
    this.doNotDisplayFailureMessage = true;
    this.partyService.updateContactInfo(this.type, this.contactInfo)
      .subscribe( num => {
        if (num) {
          this.activePane = 'left';
        }else {
          this.errorMessage = 'Failed to update contact info.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.errorMessage = 'Failed to update contact info.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel(): void {
    if (this.update) {
      this.getContactInfo();
    }else {
      this.setInputValues(new ContactInfo());
      this.activePane = 'left';
    }
  }

  setActivePane(place: string) {
    this.activePane = place;
  }
}
