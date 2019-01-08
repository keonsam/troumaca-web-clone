import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../organization";
import {Router} from "@angular/router";
import {OrganizationService} from "../organization.service";

@Component({
  selector: 'app-organization-company',
  templateUrl: './organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  name: FormControl;
  purpose: FormControl;
  organizationForm: FormGroup;
  errorMessage: string;
  doNotDisplayFailureMessage = true;

  private organization: Organization;

  constructor(private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
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
    this.getOrganization();
  }

  getOrganization() {
    this.organizationService.getOrganization('company')
      .subscribe( organization => {
        if (organization && organization.partyId) {
          this.name.setValue(organization.name);
          this.purpose.setValue(organization.purpose);
          this.organization = organization;
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Failed to get organization information. Please refresh.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate(): void {
    this.doNotDisplayFailureMessage = true;
    this.organizationService.updateOrganization(this.organization)
      .subscribe( num => {
        if (num) {
          this.router.navigate(['/lobby']);
        } else {
          this.errorMessage = 'Failed to save organization information. Please try again.';
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.errorMessage = 'Failed to save organization information. Please try again.';
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel(): void {
    this.getOrganization();
  }

}
