import {Component, OnInit} from "@angular/core";
import {OrganizationService} from "./organization.service";
import {OrganizationModel} from "./organization.model";

@Component({
  selector: 'organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  private _organizations:OrganizationModel[];


  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    var that = this;
    this.organizationService
      .getOrganizations()
      .subscribe(organizations => {
        if (organizations) {
          that.organizations = organizations;
        }
      });
  }

  get organizations(): OrganizationModel[] {
    return this._organizations;
  }

  set organizations(value: OrganizationModel[]) {
    this._organizations = value;
  }

}