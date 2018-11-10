import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {OrganizationService} from '../organization.service';
import {SessionService} from "../../../session/session.service";

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization.form.component.html',
  styleUrls: ['./organization.form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  purpose: FormControl;
  name: FormControl;
  description: FormControl;

  organizationForm: FormGroup;

  private organization: Organization;
  organizationExist = false;

  doNotDisplayFailureMessage: boolean;
  @Input() profile: boolean;
  @Output() organizationNameEvent = new EventEmitter<string>();


  constructor(private organizationService: OrganizationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private sessionService: SessionService) {

   this.organization = new Organization();

   this.purpose = new FormControl('', [Validators.required]);
   this.name = new FormControl('', [Validators.required]);
   this.description = new FormControl('');

   this.organizationForm = formBuilder.group({
     'purpose': this.purpose,
     'name': this.name,
     'description': this.description

   });

   this.organizationForm.valueChanges
   .subscribe(value => {
     if (this.organization.name !== value.name) {
       this.organizationNameEvent.emit(value.name);
     }
     this.organization.purpose = value.purpose;
     this.organization.name = value.name;
     this.organization.description = value.description;
   }, error2 => {
     console.log(error2);
   });

   this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['organization']) {
      this.setInputValues(this.route.snapshot.data['organization']);
    } else if (this.profile) {
      this.organizationService.getOrganization('profile')
        .subscribe( value => {
          if (value) {
            this.setInputValues(value);
          }
        });
    }
  }
  
  private setInputValues(organization: Organization) {
    this.purpose.setValue(organization.purpose);
    this.name.setValue(organization.name);
    this.description.setValue(organization.description);
    this.organizationNameEvent.emit(organization.name);
    this.organization = organization;
    this.organizationExist = true;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationService
      .addOrganization(this.organization, this.profile || false)
      .subscribe(value => {
        if (value && value.partyId) {
          if (this.profile) {
            this.router.navigate(['/lobby']);
          }else {
            this.router.navigate(['/parties/organizations/listing']);
          }
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

    this.organizationService
      .updateOrganization(this.organization)
      .subscribe(value => {
        if (value) {
          if (this.profile) {
            this.sessionService.loginEvent.next(true);
            this.router.navigate(['/lobby']);
          } else {
            this.router.navigate(['/parties/organizations/listing']);
          }
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

    cancel() {
      this.router.navigate(['/parties/organizations/listing']);
    }

}
