// import {environment} from '../../environments/environment';
// import {UUIDGenerator} from '../../uuid.generator';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {AssetIdentifierTypeClient} from './asset.identifier.type.client';
// import {Observable} from 'rxjs';
// import {AssetIdentifierTypes} from '../../asset-identifier-types/asset.identifier.types';
// import {AssetIdentifierType} from '../../asset-identifier-types/asset.identifier.type';
// import {map} from 'rxjs/operators';
//
// export class AssetIdentifierTypeClientHttp extends AssetIdentifierTypeClient {
//
//   hostPort = environment.hostPort;
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient) {
//     super();
//   }
//
//   findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
//     const url = `${this.hostPort}/asset-identifier-types/find?q=${searchStr}&pageSize=${pageSize}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetIdentifierType[]>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetIdentifierTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetIdentifierTypes> {
//     const url = `${this.hostPort}/asset-identifier-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetIdentifierTypes>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetIdentifierType(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
//     const url = `${this.hostPort}/asset-identifier-types/${assetIdentifierTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetIdentifierType>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   addAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
//     const url = `${this.hostPort}/asset-identifier-types`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.post<AssetIdentifierType>(url, assetIdentifierType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<number> {
//     const url = `${this.hostPort}/asset-identifier-types/${assetIdentifierType.assetIdentifierTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.put<number>(url, assetIdentifierType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
//     const url = `${this.hostPort}/asset-identifier-types/${assetIdentifierTypeId}`;
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
