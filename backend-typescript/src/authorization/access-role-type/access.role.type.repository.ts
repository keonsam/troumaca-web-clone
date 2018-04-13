import {Observable} from "rxjs/Observable";
import {AccessRoleType} from "./access.role.type";

export interface AccessRoleTypeRepository {

  addAccessRoleType(accessRoleType:AccessRoleType):Observable<AccessRoleType>;

  getAccessRoleTypeById(accessRoleTypeId:string, ownerPartyId:string):Observable<AccessRoleType>;

  updateAccessRoleType(accessRoleTypeId:string, accessRoleType:AccessRoleType):Observable<number>;

  deleteAccessRoleType(accessRoleTypeId:string):Observable<number>;

}

