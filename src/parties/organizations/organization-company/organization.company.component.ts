import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Organization} from '../../organization';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from '../organization.service';
import {OrganizationCompany} from './organization.company';

@Component({
  selector: 'app-organization-company',
  templateUrl: './organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  name: FormControl;
  purpose: FormControl;
  organizationForm: FormGroup;
  doNotDisplayFailureMessage = true;
  organizationCompany: OrganizationCompany;

  private organization: Organization;

  constructor(private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private route: ActivatedRoute,
              private router: Router) {
    this.organizationCompany = new OrganizationCompany();
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
    if (this.route.snapshot && this.route.snapshot.data['organizationCompany']) {
      this.organizationCompany = this.route.snapshot.data['organizationCompany'];
      this.setInputValues(this.organizationCompany.organization);
    }
  }

  private setInputValues(organization: Organization) {
    this.name.setValue(organization.name);
    this.purpose.setValue(organization.purpose);
    this.organization = organization;
  }

  // getOrganization() {
  //   this.organizationService.getOrganization('company')
  //     .subscribe(organization => {
  //       if (organization && organization.partyId) {
  //       }
  //     }, error => {
  //       console.log(error);
  //       this.doNotDisplayFailureMessage = false;
  //     });
  // }

  onUpdate(): void {
    this.doNotDisplayFailureMessage = true;
    this.organizationService.updateOrganization(this.organization)
      .subscribe(num => {
        if (num) {
          this.router.navigate(['/lobby']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel(): void {
    this.router.navigate(['/lobby']);
    // this.getOrganization();
  }

}
