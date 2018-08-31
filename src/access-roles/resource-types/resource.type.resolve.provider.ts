import { AccessRoleService} from '../access.role.service';
import { ResourceTypeResolve } from "./resource.type.resolve";

export function resourceTypeResolveProviderFactory (accessRoleService: AccessRoleService): ResourceTypeResolve {
  let resourceTypeResolve: ResourceTypeResolve;
  if (!resourceTypeResolve) {
    resourceTypeResolve = new ResourceTypeResolve(accessRoleService);
  }
  return resourceTypeResolve;
}

export let resourceTypeResolveProvider = {
  provide: ResourceTypeResolve,
  useFactory: resourceTypeResolveProviderFactory,
  deps: [AccessRoleService]
};
