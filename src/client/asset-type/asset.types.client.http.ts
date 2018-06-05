import {AssetTypesClient} from "./asset.types.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {AssetTypeStates} from "./asset.type.states";
import {AssetTypeClassState} from "../asset-type-class/asset.type.class.state";
import {AssetTypeClassStates} from "../asset-type-class/asset.type.class.states";
import {ValueState} from "./value.state";
import {ValueStates} from "./value.states";
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { map, reduce, somethingElse } from "underscore";
import {AssignedAttributeState} from "../asset-type-class/assigned.attribute.state";

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort:string) {
    super();
  }


    public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetTypeStates> {
    let url = `${this.hostPort}/asset-types?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
      const httpOptions = {
        headers: this.jsonHttpHeaders()
      };
    return this.httpClient.get<AssetTypeStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttributeState[]> {
    let url = `${this.hostPort}/assigned-attributes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<any>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getValues(assetTypeId: string): Observable<ValueStates> {
    // ById
    let url = `${this.hostPort}/values/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<ValueStates>(url, httpOptions)
      .map(data => {
        return data;
      });
  }

  public getAssetTypeState(assetTypeId: string): Observable<AssetTypeState> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClassState> {
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AssetTypeClassState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public findAssetTypeClassId(searchStr: string, pageSize:number): Observable<AssetTypeClassStates> {
    let url = `${this.hostPort}/asset-type-classes/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClassStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize:number): Observable<UnitOfMeasureState[]> {
    let url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasureState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState> {
    let url = `${this.hostPort}/asset-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AssetTypeState>(url, assetTypeState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public addValueState(valueState: ValueState[]): Observable<ValueState[]> {
    let url = `${this.hostPort}/values`;
    let values = map(valueState, next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<ValueState[]>(url, values, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public deleteValue(valueId: string): Observable<number> {
    let url = `${this.hostPort}/values/${valueId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .delete<number>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, assetTypeState.toJson(), httpOptions)
    .map(data => {
      return data;
    });
  }

  public updateValue(assetTypeId, valueState: ValueState[]): Observable<number> {
    let url = `${this.hostPort}/values/${assetTypeId}`;
    let values = map(valueState, next => {
      return next.toJson();
    });
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .put<number>(url, values, httpOptions)
    .map(data => {
      return data;
    });
  }

  public jsonHttpHeaders(): HttpHeaders {
    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
