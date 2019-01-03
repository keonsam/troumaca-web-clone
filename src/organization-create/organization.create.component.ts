import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import { Organization} from '../parties/organization';
import {OrganizationCreateService} from './organization.create.service';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization.create.component.html',
  styleUrls: ['./organization.create.component.css']
})

export class OrganizationCreateComponent implements OnInit {

  name: FormControl;
  purpose: FormControl;
  organizationForm: FormGroup;
  doNotDisplayFailureMessage: boolean;

  private organization: Organization;

  constructor(private formBuilder: FormBuilder,
              private organizationCreateService: OrganizationCreateService,
              private router: Router) {

    this.organization = new Organization();
    this.purpose = new FormControl('');
    this.name = new FormControl('', [Validators.required]);

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
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;

    this.organizationCreateService
      .createOrganization(this.organization)
      .subscribe(value => {
        if (value && value.partyId) {
          this.router.navigate(['/lobby']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
