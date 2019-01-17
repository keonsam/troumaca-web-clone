import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccessRolesClient} from './access.roles.client';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {UUIDGenerator} from '../../uuid.generator';
import {Permissions} from '../../access-roles/permissions';
import {Permission} from '../../access-roles/permission';
import {ResourceType} from '../../access-roles/resource.type';
import {ResourceTypes} from '../../access-roles/resource.types';
import {Resources} from '../../access-roles/resources';
import {Resource} from '../../access-roles/resource';
import {ResourcePermission} from '../../access-roles/resource.permission';
import {AccessRoleTypes} from '../../access-roles/access.role.types';
import {AccessRoleType} from '../../access-roles/access.role.type';
import {AccessRoles} from '../../access-roles/access.roles';
import {AccessRole} from '../../access-roles/access.role';
import {Grant} from '../../access-roles/grant';
import {environment} from '../../environments/environment';

export class AccessRolesClientHttp extends AccessRolesClient {

  hostPort = environment.hostPort;
  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator) {
    super();
  }

  // permission
  public getPermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Permissions> {
    const url = `${this.hostPort}/permissions?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Permissions>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getPermissionById(permissionId: string): Observable<Permission> {
    const url = `${this.hostPort}/permissions/${permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Permission>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addPermission(permissionState: Permission): Observable<Permission> {
    const url = `${this.hostPort}/permissions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<Permission>(url, permissionState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updatePermission(permissionState: Permission): Observable<number> {
    const url = `${this.hostPort}/permissions/${permissionState.permissionId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, permissionState, httpOptions)
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

  // resources
  public getPermissionsByArray(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions> {
    const url = `${this.hostPort}/permissions/available`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      pageNumber: defaultPage,
      pageSize: defaultPageSize,
      sortOrder: defaultSortOrder,
      assignedArray: assignedArray
    };
    return this.httpClient.post<Permissions>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getAssignablePermissions(defaultPage: number, defaultPageSize: number, defaultSortOrder: string, assignedArray: string[]): Observable<Permissions> {
    const url = `${this.hostPort}/permissions/assignable`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      pageNumber: defaultPage,
      pageSize: defaultPageSize,
      sortOrder: defaultSortOrder,
      assignedArray: assignedArray
    };
    return this.httpClient.post<Permissions>(url, body, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public findResourceTypeId(searchStr: string, pageSize: number): Observable<ResourceType[]> {
    const url = `${this.hostPort}/resource-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceType[]>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getResources(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<Resources> {
    const url = `${this.hostPort}/resources?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Resources>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getResourceById(resourceId: string): Observable<Resource> {
    const url = `${this.hostPort}/resources/${resourceId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Resource>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  public addResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<Resource> {
    const url = `${this.hostPort}/resources`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<Resource>(url, {resource, resourcePermissions}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updateResource(resource: Resource, resourcePermissions: ResourcePermission[]): Observable<number> {
    const url = `${this.hostPort}/resources/${resource.resourceId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    delete resource.resourceType;
    delete resource.resourcePermissions;
    return this.httpClient.put<number>(url, {resource, resourcePermissions}, httpOptions)
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

  // resourceTypes
  public getResourceTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<ResourceTypes> {
    const url = `${this.hostPort}/resource-types?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceTypes>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getResourceTypeById(resourceTypeId: string): Observable<ResourceType> {
    const url = `${this.hostPort}/resource-types/${resourceTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<ResourceType>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addResourceType(resourceTypeState: ResourceType): Observable<ResourceType> {
    const url = `${this.hostPort}/resource-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<ResourceType>(url, resourceTypeState, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateResourceType(resourceTypeState: ResourceType): Observable<number> {
    const url = `${this.hostPort}/resource-types/${resourceTypeState.resourceTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, resourceTypeState, httpOptions).pipe(map(data => {
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

  // access-roles

  public findAccessRoleTypeId(searchStr: string, pageSize: number): Observable<AccessRoleType[]> {
    const url = `${this.hostPort}/access-role-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleType[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoles(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoles> {
    const url = `${this.hostPort}/access-roles?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoles>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoleById(accessRoleId: string): Observable<AccessRole> {
    const url = `${this.hostPort}/access-roles/${accessRoleId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRole>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<AccessRole> {
    const url = `${this.hostPort}/access-roles`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<AccessRole>(url, {accessRole, grants}, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAccessRole(accessRole: AccessRole, grants: Grant[]): Observable<number> {
    const url = `${this.hostPort}/access-roles/${accessRole.accessRoleId}`;

    delete accessRole.accessRoleType;
    delete accessRole.grants;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, {accessRole, grants}, httpOptions).pipe(map(data => {
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

  // access-role-types
  public getAccessRoleTypes(defaultPage: number, defaultPageSize: number, defaultSortOrder: string): Observable<AccessRoleTypes> {
    const url = `${this.hostPort}/access-role-types?pageNumber=${defaultPage}&pageSize=${defaultPageSize}&sortOrder=${defaultSortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleTypes>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAccessRoleTypeById(accessRoleTypeId: string): Observable<AccessRoleType> {
    const url = `${this.hostPort}/access-role-types/${accessRoleTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AccessRoleType>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAccessRoleType(accessRoleTypeState: AccessRoleType): Observable<AccessRoleType> {
    const url = `${this.hostPort}/access-role-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<AccessRoleType>(url, accessRoleTypeState, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public updateAccessRoleType(accessRoleTypeState: AccessRoleType): Observable<number> {
    const url = `${this.hostPort}/access-role-types/${accessRoleTypeState.accessRoleTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, accessRoleTypeState, httpOptions).pipe(map(data => {
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

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }

}

