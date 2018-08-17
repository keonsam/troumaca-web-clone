import {AssetTypeClassClient} from './asset.type.class.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs/Observable';
import {AssetTypeClassState} from './asset.type.class.state';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetTypeClassStates} from './asset.type.class.states';
import {AttributeStates} from '../attribute/attribute.states';
import {AttributeState} from '../attribute/attribute.state';
import { DataTypeState} from '../attribute/data.type.state';
import {AssignedAttributeState} from './assigned.attribute.state';
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';
import {AssetTypeClassResponse} from '../../asset-type-classes/asset.type.class.response';
import { map } from 'underscore';

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string
  ) {
    super();
  }

  public getDataTypes(): Observable<DataTypeState[]> {
    const url = `${this.hostPort}/data-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<DataTypeState[]>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasureState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse>{
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeClassResponse>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getAttribute(attributeId: string): Observable<AttributeState>{
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AttributeState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClasses(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeClassStates> {
    const url = `${this.hostPort}/asset-type-classes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClassStates>(url, httpOptions).map(assetTypeClasses => {
      return assetTypeClasses;
    });
  }

  // public getAvailableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[]): Observable<AttributeStates> {
  //   const url = `${this.hostPort}/available-attributes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&assignedArray=${assignedArray}`;
  //   const httpOptions = {
  //     headers: this.jsonHttpHeaders()
  //   };
  //   return this.httpClient.get<AttributeStates>(url, httpOptions).map(data => {
  //     return data;
  //   });
  // }

  public getAssignableAttributes(pageNumber: number, pageSize: number, sortOrder: string, assignedArray: string[], type: string): Observable<AttributeStates> {
    const url = `${this.hostPort}/assignable-attributes/${type}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&assignedArray=${assignedArray}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AttributeStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<AssetTypeClassState> {
    const url = `${this.hostPort}/asset-type-classes`;
    const newAssetTypeClass = assetTypeClassState.toJson();
    const newAssignedAttributes = map(assignedAttributes, next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AssetTypeClassState>(url, {newAssetTypeClass, newAssignedAttributes}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public addAttribute(attributeState: AttributeState): Observable<AttributeState> {
    const url = `${this.hostPort}/attributes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AttributeState>(url, attributeState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteAttribute(attributeId: string): Observable<number> {
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]): Observable<number> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const newAssetTypeClass = assetTypeClassState.toJson();
    const newAssignedAttributes = map(assignedAttributes, next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, {newAssetTypeClass, newAssignedAttributes}, httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateAttribute(attributeId: string, availableAttributeState: AttributeState): Observable<number> {
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, availableAttributeState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
