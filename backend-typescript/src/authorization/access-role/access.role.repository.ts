import {AccessRole} from "./access.role";
import {Observable} from "rxjs/Observable";

export interface AccessRoleRepository {

  findAccessRoles(searchStr: string, pageSize: number): Observable<AccessRole[]>;
  addAccessRole(accessRole:AccessRole):Observable<AccessRole>;

  getAccessRoleById(accessRoleId:string, ownerPartyId:string):Observable<AccessRole>;

  updateAccessRole(accessRoleId:string, accessRole:AccessRole):Observable<number>;

  deleteAccessRole(accessRoleId:string):Observable<number>;

}
