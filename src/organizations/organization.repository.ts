import {OrganizationModel} from './organization.model';
import {Observable} from 'rxjs';

export abstract class OrganizationRepository {
  abstract getOrganizations(): Observable<OrganizationModel[]>;
}
