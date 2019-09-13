// import { AccessRoleService} from '../access.role.service';
// import { PermissionResolve } from "./permission.resolve";
//
// export function permissionResolveProviderFactory (accessRoleService: AccessRoleService): PermissionResolve {
//   let permissionResolve: PermissionResolve;
//   if (!permissionResolve) {
//     permissionResolve = new PermissionResolve(accessRoleService);
//   }
//   return permissionResolve;
// }
//
// export let permissionResolveProvider = {
//   provide: PermissionResolve,
//   useFactory: permissionResolveProviderFactory,
//   deps: [AccessRoleService]
// };
