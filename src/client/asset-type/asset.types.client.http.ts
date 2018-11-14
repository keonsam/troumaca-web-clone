import {AssetTypesClient} from './asset.types.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetType} from '../../asset-types/asset.type';
import {Value} from '../../asset-types/value';

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort: string) {
    super();
  }


  public getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    const url = `${this.hostPort}/asset-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypes>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  public getAssetTypeState(assetTypeId: string): Observable<AssetType> {
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

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    const url = `${this.hostPort}/asset-type-classes/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClass[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAssetTypeState(assetType: AssetType, values: Value[]): Observable<AssetType> {
    const url = `${this.hostPort}/asset-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    delete assetType.unitOfMeasure;
    delete assetType.assetTypeClass;
    return this.httpClient
      .post<AssetType>(url, {assetType, values}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
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

  public updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    }
    delete assetType.unitOfMeasure;
    delete assetType.assetTypeClass;
    delete assetType.values;
    return this.httpClient
      .put<number>(url, {assetType, values}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  // OTHERS

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    const url = `${this.hostPort}/assigned-attributes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<any>(url, httpOptions)
      .pipe(map(data => {
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
