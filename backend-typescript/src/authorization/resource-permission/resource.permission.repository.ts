import {Observable} from "rxjs/Observable";
import {ResourcePermission} from "./resource.permission";

export interface ResourcePermissionRepository {

  getResourcePermissionsByResourceId(resourceId:string):Observable<ResourcePermission[]>;

  addResourcePermission(resourcePermissions:ResourcePermission[]):Observable<ResourcePermission[]>;

  getResourcePermissionById(resourcePermissionId:string, ownerPartyId:string):Observable<ResourcePermission>;

  updateResourcePermission(resourcePermissionId:string, resourcePermission:ResourcePermission):Observable<number>;

  deleteResourcePermission(resourceId:string):Observable<number>;

}
