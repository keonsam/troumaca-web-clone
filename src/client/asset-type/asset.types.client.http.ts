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

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort:string) {
    super();
  }


    public getAssetTypes(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetTypeStates> {
    /*let generateUUID = this.uuidGenerator.generateUUID();
    let assetTypeStates:AssetTypeState[] = [];
    return Observable.of(assetTypeStates);*/

    let array = [];
    array.push(this.hostPort);
    array.push("/asset-types");

    let queryStr = [];

    if (pageNumber) {
      queryStr.push("pageNumber=" + pageNumber);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + pageSize);
    }

    if (sortOrder) {
      queryStr.push("sortOrder=" + sortOrder);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<AssetTypeStates>(array.join(""), {
    // return this.http.get(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<any> {
    let url = `${this.hostPort}/assigned-attributes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
      .get<any>(url, {headers:headers})
      .map(data => {
        return data;
      });
  }

  public getValues(assetTypeId: string): Observable<ValueStates> {
    // ById
    let url = `${this.hostPort}/values/${assetTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());

    return this.httpClient
      .get<ValueStates>(url, {headers:headers})
      .map(data => {
        return data;
      });
  }

  public getAssetTypeState(assetTypeId: string): Observable<AssetTypeState> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AssetTypeState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClassState(assetTypeClassId: string): Observable<AssetTypeClassState> {
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AssetTypeClassState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public findAssetTypeClassId(searchStr: string, pageSize:number): Observable<AssetTypeClassStates> {
    let url = `${this.hostPort}/find-asset-type-classes?q=${searchStr}&pageSize=${pageSize}`;

    return this.httpClient.get<AssetTypeClassStates>(url, {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize:number): Observable<UnitOfMeasureState[]> {
    let url = `${this.hostPort}/find-unit-of-measures?q=${searchStr}&pageSize=${pageSize}`;

    return this.httpClient.get<UnitOfMeasureState[]>(url, {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public addAssetTypeState(assetTypeState: AssetTypeState): Observable<AssetTypeState> {
    let url = `${this.hostPort}/asset-types`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<AssetTypeState>(url, assetTypeState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addValueState(valueState: ValueState[]): Observable<ValueState[]> {
    let url = `${this.hostPort}/values`;
    let values = map(valueState, next => {
      return next.toJson();
    });
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<ValueState[]>(url, values, {headers: headers})
    .map(data => {
      return data;
    });
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteValue(valueId: string): Observable<number> {
    let url = `${this.hostPort}/values/${valueId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete<number>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateAssetType(assetTypeId: string, assetTypeState: AssetTypeState): Observable<number> {
    let url = `${this.hostPort}/asset-types/${assetTypeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, assetTypeState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateValue(assetTypeId, valueState: ValueState[]): Observable<number> {
    let url = `${this.hostPort}/values/${assetTypeId}`;
    let values = map(valueState, next => {
      return next.toJson();
    });
    console.log(values);
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, values, {headers:headers})
    .map(data => {
      return data;
    });
  }

}
