import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-organization-company',
  templateUrl: './organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  organizationName: string;

  constructor() {}

  ngOnInit(): void {
  }

  setOrganization( name: string) {
    this.organizationName = name;
  }

}
