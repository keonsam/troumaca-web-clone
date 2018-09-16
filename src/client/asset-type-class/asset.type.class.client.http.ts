import {AssetTypeClassClient} from './asset.type.class.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {AssetTypeClassState} from './asset.type.class.state';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetTypeClassStates} from './asset.type.class.states';
import {AttributeStates} from '../attribute/attribute.states';
import {AssignedAttributeState} from './assigned.attribute.state';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string
  ) {
    super();
  }

  public getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<AttributeStates> {
    const url = `${this.hostPort}/available-attributes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const body = {
      pageNumber,
      pageSize,
      sortOrder,
      assignedArray
    };
    return this.httpClient.post<AttributeStates>(url, body, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttributeState[]> {
    const url = `${this.hostPort}/assigned-attributes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssignedAttributeState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse>{
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeClassResponse>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClassStates> {
    const url = `${this.hostPort}/asset-type-classes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClassStates>(url, httpOptions).pipe(map(assetTypeClasses => {
      return assetTypeClasses;
    }));
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<AssetTypeClassState> {
    const url = `${this.hostPort}/asset-type-classes`;
    const newAssetTypeClass = assetTypeClassState.toJson();
    const newAssignedAttributes = assignedAttributes.map( next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AssetTypeClassState>(url, {newAssetTypeClass, newAssignedAttributes}, httpOptions)
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

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<number> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const newAssetTypeClass = assetTypeClassState.toJson();
    const newAssignedAttributes = assignedAttributes.map( next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, {newAssetTypeClass, newAssignedAttributes}, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
