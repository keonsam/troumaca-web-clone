import {AccessRoleTypeRepository} from "./access.role.type.repository";
import {createAccessRoleTypeRepositoryFactory} from "./access.role.type.repository.factory";
import {Observable} from "rxjs/Observable";
import {AccessRoleType} from "./access.role.type";

export class AccessRoleTypeOrchestrator {

  private accessRoleTypeRepository:AccessRoleTypeRepository;

  constructor() {
    this.accessRoleTypeRepository = createAccessRoleTypeRepositoryFactory();
  }

  addAccessRoleType(accessRoleType:AccessRoleType):Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.addAccessRoleType(accessRoleType);
  };

  getAccessRoleTypeById(accessRoleTypeId:string, ownerPartyId:string):Observable<AccessRoleType> {
    return this.accessRoleTypeRepository.getAccessRoleTypeById(accessRoleTypeId, ownerPartyId);
  };

  updateAccessRoleType(accessRoleTypeId:string, accessRoleType:AccessRoleType):Observable<number> {
    return this.accessRoleTypeRepository.updateAccessRoleType(accessRoleTypeId, accessRoleType);
  };

  deleteAccessRoleType(accessRoleTypeId:string):Observable<number>{
    return this.accessRoleTypeRepository.deleteAccessRoleType(accessRoleTypeId);
  };

}








