import {SecurityRepository} from '../../security/security.repository';
import {SecurityClient} from '../../client/security/security.client';

export class SecurityRepositoryAdapter implements SecurityRepository {
  constructor(private securityClient: SecurityClient) {
  }
}
