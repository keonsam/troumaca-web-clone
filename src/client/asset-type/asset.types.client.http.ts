import {AssetTypesClient} from './asset.types.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetType} from '../../asset-types/asset.type';
import {Instance} from '../../asset-types/instance';
import {environment} from '../../environments/environment';
import {Brand} from '../../brands/brand';

export class AssetTypesClientHttp extends AssetTypesClient {

  hostPort = environment.hostPort;

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator) {
    super();
  }

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    const url = `${this.hostPort}/asset-types/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetType[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    const url = `${this.hostPort}/asset-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypes>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  getAssetTypeState(assetTypeId: string): Observable<AssetType> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<AssetType>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addAssetTypeState(assetType: AssetType): Observable<AssetType> {
    const url = `${this.hostPort}/asset-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<AssetType>(url, assetType, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .delete<number>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .put<number>(url, assetType, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  // OTHERS

  findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
    const url = `${this.hostPort}/asset-types/instances?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Instance[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    const url = `${this.hostPort}/brands/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Brand[]>(url, httpOptions).pipe(map(data => {
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
