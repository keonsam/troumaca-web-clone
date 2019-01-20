import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {OrganizationService} from "../organization.service";
import {OrganizationCompany} from './organization.company';

export class OrganizationCompanyResolve implements Resolve<OrganizationCompany> {
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getOrganizationCompany();
  }

}
