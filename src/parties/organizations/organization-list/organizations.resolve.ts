import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {OrganizationService} from '../organization.service';
import { Organizations} from '../../organizations';

export class OrganizationsResolve implements Resolve<Organizations> {
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getOrganizations(this.defaultPage, this.defaultPageSize, this.defaultSortOrder);
  }

}
