import {AssetTypesClient} from './asset.types.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {AssetTypeState} from './asset.type.state';
import {AssetTypeStates} from './asset.type.states';
import {AssetTypeClassState} from '../asset-type-class/asset.type.class.state';
import {ValueState} from './value.state';
import {ValueStates} from './value.states';
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssignedAttributeState} from '../asset-type-class/assigned.attribute.state';
import {AssetTypeResponse} from '../../asset-types/asset.type.response';

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort: string) {
    super();
  }


    public getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypeStates> {
    const url = `${this.hostPort}/asset-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
      const httpOptions = {
        headers: this.jsonHttpHeaders()
      };
    return this.httpClient.get<AssetTypeStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttributeState[]> {
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

  public getValues(assetTypeId: string): Observable<ValueStates> {
    // ById
    const url = `${this.hostPort}/values/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<ValueStates>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getAssetTypeState(assetTypeId: string): Observable<AssetTypeResponse> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeResponse>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClassState> {
    const url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeClassState>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClassState[]> {
    const url = `${this.hostPort}/asset-type-classes/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClassState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasureState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public addAssetTypeState(assetTypeState: AssetTypeState, values: ValueState[]): Observable<AssetTypeState> {
    const url = `${this.hostPort}/asset-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const postData = {
      'assetType': assetTypeState.toJson(),
      'values': values.map( next => {
            return next.toJson();
          })
    };
    return this.httpClient
    .post<AssetTypeState>(url, postData, httpOptions)
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

  public deleteValue(valueId: string): Observable<number> {
    const url = `${this.hostPort}/values/${valueId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState, values: ValueState[]): Observable<number> {
    const url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const updateData = {
      'assetType': assetTypeState.toJson(),
      'values': values.map( value => {
        return value.toJson();
      })
    };
    return this.httpClient
    .put<number>(url, updateData, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
