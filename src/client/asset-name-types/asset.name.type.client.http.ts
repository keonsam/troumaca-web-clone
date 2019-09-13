// import {environment} from '../../environments/environment';
// import {UUIDGenerator} from '../../uuid.generator';
// import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {AssetNameTypeClient} from './asset.name.type.client';
// import {Observable} from 'rxjs';
// import {AssetNameTypes} from '../../asset-name-types/asset.name.types';
// import {AssetNameType} from '../../asset-name-types/asset.name.type';
// import {map} from 'rxjs/operators';
//
// export class AssetNameTypeClientHttp extends AssetNameTypeClient {
//
//   hostPort = environment.hostPort;
//   constructor(private uuidGenerator: UUIDGenerator,
//               private httpClient: HttpClient) {
//     super();
//   }
//
//   findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
//     const url = `${this.hostPort}/asset-name-types/find?q=${searchStr}&pageSize=${pageSize}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetNameType[]>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetNameTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetNameTypes> {
//     const url = `${this.hostPort}/asset-name-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetNameTypes>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   getAssetNameType(assetNameTypeId: string): Observable<AssetNameType> {
//     const url = `${this.hostPort}/asset-name-types/${assetNameTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.get<AssetNameType>(url, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   addAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
//     const url = `${this.hostPort}/asset-name-types`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.post<AssetNameType>(url, assetNameType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   updateAssetNameType(assetNameType: AssetNameType): Observable<number> {
//     const url = `${this.hostPort}/asset-name-types/${assetNameType.assetNameTypeId}`;
//     const httpOptions = {
//       headers: this.jsonHttpHeaders()
//     };
//     return this.httpClient.put<number>(url, assetNameType, httpOptions).pipe(map(data => {
//       return data;
//     }));
//   }
//
//   deleteAssetNameType(assetNameTypeId: string): Observable<number> {
//     const url = `${this.hostPort}/asset-name-types/${assetNameTypeId}`;
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
