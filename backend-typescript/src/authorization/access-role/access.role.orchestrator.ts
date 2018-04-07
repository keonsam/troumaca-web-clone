import {AccessRoleRepository} from "./access.role.repository";
import {createAccessRoleRepositoryFactory} from "./access.role.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRole} from "./access.role";

export class AccessRoleOrchestrator {

  private accessRoleRepository:AccessRoleRepository;

  constructor() {
    this.accessRoleRepository = createAccessRoleRepositoryFactory();
  }

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.accessRoleRepository.findAccessRoles(searchStr, pageSize);
  };

  addAccessRole(accessRole:AccessRole):Observable<AccessRole> {
    return this.accessRoleRepository.addAccessRole(accessRole);
  };

  getAccessRoleById(accessRoleId:string, ownerPartyId:string):Observable<AccessRole> {
    return this.accessRoleRepository.getAccessRoleById(accessRoleId, ownerPartyId);
  };

  updateAccessRole(accessRoleId:string, accessRole:AccessRole):Observable<number> {
    return this.accessRoleRepository.updateAccessRole(accessRoleId, accessRole);
  };

  deleteAccessRole(accessRoleId:string):Observable<number>{
    return this.accessRoleRepository.deleteAccessRole(accessRoleId);
  };

}
