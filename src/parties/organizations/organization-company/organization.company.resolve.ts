import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {OrganizationService} from '../organization.service';
import {Organization} from '../../organization';

export class OrganizationCompanyResolve implements Resolve<Organization> {
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getOrganization('company');
  }

}
