import {AssetTypeClassClient} from './asset.type.class.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Attributes} from '../../attributes/attributes';
import {AssetTypeClasses} from '../../asset-type-classes/asset.type.classes';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string
  ) {
    super();
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClass> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<AssetTypeClass>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClasses> {
    const url = `${this.hostPort}/asset-type-classes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClasses>(url, httpOptions).pipe(map(assetTypeClasses => {
      return assetTypeClasses;
    }));
  }

  public addAssetTypeClass(assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<AssetTypeClass> {
    const url = `${this.hostPort}/asset-type-classes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<AssetTypeClass>(url, {assetTypeClass, assignedAttributes}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .delete<number>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClass: AssetTypeClass, assignedAttributes: AssignedAttribute[]): Observable<number> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, {assetTypeClass, assignedAttributes}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  // OTHERS

  public getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    const url = `${this.hostPort}/attributes/available`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      pageNumber,
      pageSize,
      sortOrder,
      assignedArray
    };
    return this.httpClient.post<Attributes>(url, body, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<Attributes> {
    const url = `${this.hostPort}/attributes/assigned`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      pageNumber,
      pageSize,
      sortOrder,
      assignedArray
    };
    return this.httpClient.post<Attributes>(url, body, httpOptions).pipe(map(data => {
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
