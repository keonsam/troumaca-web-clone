import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {OrganizationService} from '../organization.service';
import {CompanyInfo} from './company.info';

export class CompanyResolve implements Resolve<CompanyInfo> {
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getCompany();
  }

}
