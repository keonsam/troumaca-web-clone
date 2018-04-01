import {Observable} from "rxjs/Observable";
import {ResourcePermission} from "./resource.permission";

export interface ResourcePermissionRepository {

  addResourcePermission(resourcePermission:ResourcePermission):Observable<ResourcePermission>;

  getResourcePermissionById(resourcePermissionId:string, ownerPartyId:string):Observable<ResourcePermission>;

  updateResourcePermission(resourcePermissionId:string, resourcePermission:ResourcePermission):Observable<number>;

  deleteResourcePermission(resourcePermissionId:string):Observable<number>;

}
