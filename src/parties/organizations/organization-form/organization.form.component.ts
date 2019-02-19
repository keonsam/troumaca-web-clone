import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {Organization} from '../../organization';
import {OrganizationService} from '../organization.service';
import {ORGANIZATION, PARTY} from '../../../app/routes';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization.form.component.html',
  styleUrls: ['./organization.form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  purpose: FormControl;
  name: FormControl;

  organizationForm: FormGroup;

  private organization: Organization;

  update = false;
  doNotDisplayFailureMessage: boolean;
  private orgLink = `/${PARTY}/${ORGANIZATION}`;


  constructor(private organizationService: OrganizationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.organization = new Organization();

    this.name = new FormControl('', [Validators.required]);
    this.purpose = new FormControl('');

    this.organizationForm = formBuilder.group({
      'purpose': this.purpose,
      'name': this.name,
    });

    this.organizationForm.valueChanges
      .subscribe(value => {
        this.organization.name = value.name;
        this.organization.purpose = value.purpose;
      }, error2 => {
        console.log(error2);
      });

    this.doNotDisplayFailureMessage = true;

  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['organization']) {
      this.setInputValues(this.route.snapshot.data['organization']);
    }
  }

  private setInputValues(organization: Organization) {
    this.purpose.setValue(organization.purpose);
    this.name.setValue(organization.name);
    this.organization = organization;
    this.update = true;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationService
      .addOrganization(this.organization)
      .subscribe(value => {
        if (value && value.partyId) {
          this.router.navigate([`${this.orgLink}/listing`]);
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
          this.router.navigate([`${this.orgLink}/listing`]);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate([`${this.orgLink}/listing`]);
  }

}
