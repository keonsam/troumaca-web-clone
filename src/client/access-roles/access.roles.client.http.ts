import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, reduce, somethingElse } from "underscore";
import {AccessRolesClient} from "./access.roles.client";
import {PermissionStates} from "./permission.states";
import {PermissionState} from "./permission.state";
import {ResourceState} from "./resource.state";
import {ResourceStates} from "./resource.states";
import {ResourceTypeState} from "./resource.type.state";
import {ResourceTypeStates} from "./resource.type.states";
import {ResourcePermissionState} from "./resource.permission.state";
import {AccessRoleState} from "./access.role.state";
import {AccessRoleStates} from "./access.role.states";
import {Observable} from "rxjs/Observable";
import {UUIDGenerator} from "../../uuid.generator";

export class AccessRolesClientHttp extends AccessRolesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort:string) {
    super();
  }
  //permission
  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>{
    let url = `${this.hostPort}/permissions?defaultPage=${defaultPage}&defaultPageSize=${defaultPageSize}&defaultSortOrder=${defaultSortOrder}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<PermissionStates>(url, {headers}).map(data => {
      return data;
    });
  }

  public getPermissionById(permissionId: string): Observable<PermissionState>{
    let url = `${this.hostPort}/permissions/${permissionId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<PermissionState>(url, {headers}).map(data => {
      return data;
    });
  }

  public addPermission(permissionState: PermissionState): Observable<PermissionState>{
    let url = `${this.hostPort}/permissions`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.post<PermissionState>(url, permissionState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public updatePermission(permissionState: PermissionState): Observable<number> {
    let url = `${this.hostPort}/permissions/${permissionState.permissionId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.put<number>(url, permissionState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public deletePermission(permissionId: string): Observable<number> {
    let url = `${this.hostPort}/permissions/${permissionId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.delete<number>(url, {headers}).map(data => {
      return data;
    });
  }

  //resources
  public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray:string[], type:string): Observable<PermissionStates> {
    let url = `${this.hostPort}/permissions/${type}?defaultPage=${defaultPage}&defaultPageSize=${defaultPageSize}&defaultSortOrder=${defaultSortOrder}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.post<PermissionStates>(url, {assignedArray},{headers}).map(data => {
      console.log(data);
      return data;
    });
  }

  public  getResourcePermissionsByResourceId(permissionId: string): Observable<ResourcePermissionState[]> {
    let url = `${this.hostPort}/resource-permissions-by-id/${permissionId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourcePermissionState[]>(url, {headers}).map(data => {
      return data;
    });
  }

  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceTypeState[]> {
    let url = `${this.hostPort}/find-resource-types?q=${searchStr}&pageSize=${pageSize}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourceTypeState[]>(url, {headers}).map(data => {
      return data;
    });
  }

  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceStates>{
    let url = `${this.hostPort}/resources?defaultPage=${defaultPage}&defaultPageSize=${defaultPageSize}&defaultSortOrder=${defaultSortOrder}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourceStates>(url, {headers}).map(data => {
      return data;
    });
  }

  public getResourceById(resourceId: string): Observable<ResourceState>{
    let url = `${this.hostPort}/resources/${resourceId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourceState>(url, {headers}).map(data => {
      return data;
    });
  }


  public addResource(resourceState: ResourceState, resourcePermissionState:ResourcePermissionState[]): Observable<ResourceState>{
    let url = `${this.hostPort}/resources`;
    let resource = resourceState.toJson();
    let resourcePermission = map(resourcePermissionState, value => {
      return value.toJson();
    });
    console.log(resourcePermission);
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.post<ResourceState>(url, {resource, resourcePermission}, {headers}).map(data => {
      return data;
    });
  }

  public updateResource(resourceState: ResourceState, resourcePermissionState:ResourcePermissionState[]): Observable<number> {
    let url = `${this.hostPort}/resources/${resourceState.resourceId}`;
    let resource = resourceState.toJson();
    let resourcePermission = map(resourcePermissionState, value => {
      return value.toJson();
    });
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.put<number>(url, {resource, resourcePermission}, {headers}).map(data => {
      return data;
    });
  }

  public deleteResource(resourceId: string): Observable<number> {
    let url = `${this.hostPort}/resources/${resourceId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.delete<number>(url, {headers}).map(data => {
      return data;
    });
  }

  //resourceTypes
  public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypeStates>{
    let url = `${this.hostPort}/resource-types?defaultPage=${defaultPage}&defaultPageSize=${defaultPageSize}&defaultSortOrder=${defaultSortOrder}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourceTypeStates>(url, {headers}).map(data => {
      return data;
    });
  }

  public getResourceTypeById(resourceTypeId: string): Observable<ResourceTypeState>{
    let url = `${this.hostPort}/resource-types/${resourceTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<ResourceTypeState>(url, {headers}).map(data => {
      return data;
    });
  }

  public addResourceType(resourceTypeState: ResourceTypeState): Observable<ResourceTypeState>{
    let url = `${this.hostPort}/resource-types`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.post<ResourceTypeState>(url, resourceTypeState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public updateResourceType(resourceTypeState: ResourceTypeState): Observable<number> {
    let url = `${this.hostPort}/resource-types/${resourceTypeState.resourceTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.put<number>(url, resourceTypeState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public deleteResourceType(resourceTypeId: string): Observable<number> {
    let url = `${this.hostPort}/resource-types/${resourceTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.delete<number>(url, {headers}).map(data => {
      return data;
    });
  }

  //access-roles
  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleStates>{
    let url = `${this.hostPort}/access-roles?defaultPage=${defaultPage}&defaultPageSize=${defaultPageSize}&defaultSortOrder=${defaultSortOrder}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<AccessRoleStates>(url, {headers}).map(data => {
      return data;
    });
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRoleState>{
    let url = `${this.hostPort}/access-roles/${accessRoleId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.get<AccessRoleState>(url, {headers}).map(data => {
      return data;
    });
  }

  public addAccessRole(accessRoleState: AccessRoleState): Observable<AccessRoleState>{
    let url = `${this.hostPort}/access-roles`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.post<AccessRoleState>(url, accessRoleState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public updateAccessRole(accessRoleState: AccessRoleState): Observable<number> {
    let url = `${this.hostPort}/access-roles/${accessRoleState.accessRoleId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.put<number>(url, accessRoleState.toJson(), {headers}).map(data => {
      return data;
    });
  }

  public deleteAccessRole(accessRoleId: string): Observable<number> {
    let url = `${this.hostPort}/access-roles/${accessRoleId}`;
    let headers: HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient.delete<number>(url, {headers}).map(data => {
      return data;
    });
  }
}
