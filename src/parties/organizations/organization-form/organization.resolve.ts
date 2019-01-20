import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Organization } from '../../organization';
import {OrganizationService} from "../organization.service";

export class OrganizationResolve implements Resolve<Organization> {
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getOrganization(route.paramMap.get('partyId') || 'company');
  }

}