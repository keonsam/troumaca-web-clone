import {AccessRolesClient} from '../../client/access-roles/access.roles.client';
import {AccessRoleRepository} from '../../access-roles/access.role.repository';
import {AccessRoleRepositoryAdapter} from './access.role.repository.adapter';

export function accessRoleRepositoryProviderFactory (accessRolesClient: AccessRolesClient): AccessRoleRepository {
  let accessRoleRepositoryAdapter: AccessRoleRepositoryAdapter;
  if (!accessRoleRepositoryAdapter) {
    accessRoleRepositoryAdapter = new AccessRoleRepositoryAdapter(accessRolesClient);
  }
  return accessRoleRepositoryAdapter;
}

export let accessRoleRepositoryProvider = {
  provide: AccessRoleRepository,
  useFactory: accessRoleRepositoryProviderFactory,
  deps: [AccessRolesClient]
};
