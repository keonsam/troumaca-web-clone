// import {environment} from '../../environments/environment';
// import {UUIDGenerator} from '../../uuid.generator';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {AssetRoleTypeClient} from './asset.role.type.client';
// import {Observable} from 'rxjs';
// import {AssetRoleTypes} from '../../asset-role-types/asset.role.types';
// import {AssetRoleType} from '../../asset-role-types/asset.role.type';
// import {map} from 'rxjs/operators';
//
// export class AssetRoleTypeClientHttp extends AssetRoleTypeClient {
//
//   hostPort = environment.hostPort;
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient) {
//     super();
//   }
//
//   findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
//     const url = `${this.hostPort}/asset-role-types/find?q=${searchStr}&pageSize=${pageSize}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetRoleType[]>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetRoleTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetRoleTypes> {
//     const url = `${this.hostPort}/asset-role-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetRoleTypes>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetRoleType(assetRoleTypeId: string): Observable<AssetRoleType> {
//     const url = `${this.hostPort}/asset-role-types/${assetRoleTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetRoleType>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   addAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
//     const url = `${this.hostPort}/asset-role-types`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.post<AssetRoleType>(url, assetRoleType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   updateAssetRoleType(assetRoleType: AssetRoleType): Observable<number> {
//     const url = `${this.hostPort}/asset-role-types/${assetRoleType.assetRoleTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.put<number>(url, assetRoleType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
//     const url = `${this.hostPort}/asset-role-types/${assetRoleTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   private jsonHttpHeaders(): HttpHeaders {
//     return new HttpHeaders({
//       'Content-Type':  'application/json',
//       'correlationId': this.uuidGenerator.generateUUID()
//     });
//   }
// }
