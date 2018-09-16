import { AccessRoleResolve } from './access.role.resolve';
import { AccessRoleService} from './access.role.service';

export function accessRoleResolveProviderFactory (accessRoleService: AccessRoleService): AccessRoleResolve {
  let accessRoleResolve: AccessRoleResolve;
  if (!accessRoleResolve) {
    accessRoleResolve = new AccessRoleResolve(accessRoleService);
  }
  return accessRoleResolve;
}

export let accessRoleResolveProvider = {
  provide: AccessRoleResolve,
  useFactory: accessRoleResolveProviderFactory,
  deps: [AccessRoleService]
};
