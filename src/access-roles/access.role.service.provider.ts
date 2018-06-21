import {AccessRoleService} from './access.role.service';
import {AccessRoleRepository} from './access.role.repository';

export function accessRoleServiceProviderFactory (accessRoleRepository: AccessRoleRepository): AccessRoleService {
  let accessRoleService: AccessRoleService;
  if (!accessRoleService) {
    accessRoleService = new AccessRoleService(accessRoleRepository);
  }
  return accessRoleService;
}

export let accessRoleServiceProvider = {
  provide: AccessRoleService,
  useFactory: accessRoleServiceProviderFactory,
  useClass: AccessRoleService,
  deps: [AccessRoleRepository]
};
