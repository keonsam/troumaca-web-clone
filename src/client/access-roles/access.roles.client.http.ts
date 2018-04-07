import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, reduce, somethingElse } from "underscore";
import {AccessRolesClient} from "./access.roles.client";
import {PermissionStates} from "./permission.states";
import {PermissionState} from "./permission.state";
import {Observable} from "rxjs/Observable";
import {UUIDGenerator} from "../../uuid.generator";
import {AssetTypeStates} from "../asset-type/asset.type.states";

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
      console.log(data);
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
}
