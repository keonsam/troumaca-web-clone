import { AccessRoleTypeResolve } from './access.role.type.resolve';
import { AccessRoleService} from './access.role.service';

export function accessRoleTypeResolveProviderFactory (accessRoleService: AccessRoleService): AccessRoleTypeResolve {
  let accessRoleTypeResolve: AccessRoleTypeResolve;
  if (!accessRoleTypeResolve) {
    accessRoleTypeResolve = new AccessRoleTypeResolve(accessRoleService);
  }
  return accessRoleTypeResolve;
}

export let accessRoleTypeResolveProvider = {
  provide: AccessRoleTypeResolve,
  useFactory: accessRoleTypeResolveProviderFactory,
  deps: [AccessRoleService]
};
