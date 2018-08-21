import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessRolesClient} from './access.roles.client';
import {PermissionStates} from './permission.states';
import {PermissionState} from './permission.state';
import {ResourceState} from './resource.state';
import {ResourceStates} from './resource.states';
import {ResourceTypeState} from './resource.type.state';
import {ResourceTypeStates} from './resource.type.states';
import {ResourcePermissionState} from './resource.permission.state';
import {AccessRoleState} from './access.role.state';
import {AccessRoleStates} from './access.role.states';
import {AccessRoleTypeState} from './access.role.type.state';
import {AccessRoleTypeStates} from './access.role.type.states';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {UUIDGenerator} from '../../uuid.generator';
import {GrantState} from './grant.state';
import {AccessRoleResponse} from '../../access-roles/access.role.response';

export class AccessRolesClientHttp extends AccessRolesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort: string) {
    super();
  }
  // permission
  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<PermissionStates>{
    const url = `${this.hostPort}/permissions?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PermissionStates>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public getPermissionById(permissionId: string): Observable<PermissionState>{
    const url = `${this.hostPort}/permissions/${permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PermissionState>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public addPermission(permissionState: PermissionState): Observable<PermissionState>{
    const url = `${this.hostPort}/permissions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<PermissionState>(url, permissionState.toJson(), httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public updatePermission(permissionState: PermissionState): Observable<number> {
    const url = `${this.hostPort}/permissions/${permissionState.permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, permissionState.toJson(), httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public deletePermission(permissionId: string): Observable<number> {
    const url = `${this.hostPort}/permissions/${permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  //resources
  public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[], type: string): Observable<PermissionStates> {
    const url = `${this.hostPort}/permissions/${type}?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}&assignedArray=${assignedArray}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<PermissionStates>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public  getResourcePermissionsByResourceId(permissionId: string): Observable<ResourcePermissionState[]> {
    const url = `${this.hostPort}/resource-permissions/${permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourcePermissionState[]>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceTypeState[]> {
    const url = `${this.hostPort}/resource-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceTypeState[]>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceStates>{
    const url = `${this.hostPort}/resources?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceStates>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public getResourceById(resourceId: string): Observable<ResourceState>{
    const url = `${this.hostPort}/resources/${resourceId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceState>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }


  public addResource(resourceState: ResourceState, resourcePermissionState: ResourcePermissionState[]): Observable<ResourceState>{
    const url = `${this.hostPort}/resources`;
    const resource = resourceState.toJson();
    const resourcePermission = resourcePermissionState.map( value => {
      return value.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<ResourceState>(url, {resource, resourcePermission}, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public updateResource(resourceState: ResourceState, resourcePermissionState: ResourcePermissionState[]): Observable<number> {
    const url = `${this.hostPort}/resources/${resourceState.resourceId}`;
    const resource = resourceState.toJson();
    const resourcePermission = resourcePermissionState.map( value => {
      return value.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, {resource, resourcePermission}, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public deleteResource(resourceId: string): Observable<number> {
    const url = `${this.hostPort}/resources/${resourceId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  //resourceTypes
  public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypeStates>{
    const url = `${this.hostPort}/resource-types?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceTypeStates>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public getResourceTypeById(resourceTypeId: string): Observable<ResourceTypeState>{
    const url = `${this.hostPort}/resource-types/${resourceTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceTypeState>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public addResourceType(resourceTypeState: ResourceTypeState): Observable<ResourceTypeState>{
    const url = `${this.hostPort}/resource-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<ResourceTypeState>(url, resourceTypeState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateResourceType(resourceTypeState: ResourceTypeState): Observable<number> {
    const url = `${this.hostPort}/resource-types/${resourceTypeState.resourceTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, resourceTypeState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public deleteResourceType(resourceTypeId: string): Observable<number> {
    const url = `${this.hostPort}/resource-types/${resourceTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  //access-roles
  public getResourcesByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[], type: string): Observable<ResourceStates> {
    const url = `${this.hostPort}/resources/${type}?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}&assignedArray=${assignedArray}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceStates>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public getAllResourcePermissions(): Observable<ResourcePermissionState[]> {
    const url = `${this.hostPort}/resource-permissions/`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourcePermissionState[]>(url, httpOptions)
      .pipe(map(data => {
      return data;
    }));
  }

  public findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleTypeState[]> {
    const url = `${this.hostPort}/access-role-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleTypeState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleStates>{
    const url = `${this.hostPort}/access-roles?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRoleResponse>{
    const url = `${this.hostPort}/access-roles/${accessRoleId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleResponse>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAccessRole(accessRoleState: AccessRoleState, grants: GrantState[]): Observable<AccessRoleState>{
    const url = `${this.hostPort}/access-roles`;
    const accessRole = accessRoleState.toJson();
    const grant = grants.map( next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<AccessRoleState>(url, {accessRole, grant}, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAccessRole(accessRoleState: AccessRoleState, grants: GrantState[]): Observable<number> {
    const url = `${this.hostPort}/access-roles/${accessRoleState.accessRoleId}`;
    const accessRole = accessRoleState.toJson();
    const grant = grants.map( next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, {accessRole, grant}, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public deleteAccessRole(accessRoleId: string): Observable<number> {
    const url = `${this.hostPort}/access-roles/${accessRoleId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  // grants
  public getGrantsByAccessRoleId(accessRoleId: string): Observable<GrantState[]> {
    const url = `${this.hostPort}/grants/${accessRoleId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<GrantState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  // access-role-types
  public getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypeStates>{
    const url = `${this.hostPort}/access-role-types?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleTypeStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleTypeState>{
    const url = `${this.hostPort}/access-role-types/${accessRoleTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleTypeState>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAccessRoleType(accessRoleTypeState: AccessRoleTypeState): Observable<AccessRoleTypeState>{
    const url = `${this.hostPort}/access-role-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<AccessRoleTypeState>(url, accessRoleTypeState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAccessRoleType(accessRoleTypeState: AccessRoleTypeState): Observable<number> {
    const url = `${this.hostPort}/access-role-types/${accessRoleTypeState.accessRoleTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, accessRoleTypeState.toJson(), httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public deleteAccessRoleType(accessRoleTypeId: string): Observable<number> {
    const url = `${this.hostPort}/access-role-types/${accessRoleTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });

    return httpHeaders;
  }

}
