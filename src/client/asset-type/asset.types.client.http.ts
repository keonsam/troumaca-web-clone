import {AssetTypesClient} from "./asset.types.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {AssetTypeStates} from "./asset.type.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AssetTypeClassStates} from "../asset-type-class/asset.type.class.states";
import {ValueState} from "./value.state";
import {ValueStates} from "./value.states";

import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  public getAttributes(assetTypeClassId: string): Observable<AttributeStates> {

  let array = [];
  array.push(this.hostPort);
  array.push("/asset-types/attributes");

  let queryStr = [];

  if (assetTypeClassId) {
    queryStr.push("assetTypeClassId=" + assetTypeClassId);
  }


  if (queryStr.length > 0) {
    array.push("?");
    array.push(queryStr.join("&"));
  }

  return this.httpClient.get<AttributeStates>(array.join(""), {
  // return this.http.get(array.join(""), {
    headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
  }).map(data => {
    return data;
  });
  }

  public getValues(assetTypeId: string): Observable<ValueStates> {

  let array = [];
  array.push(this.hostPort);
  array.push("/asset-types/values");

  let queryStr = [];
    queryStr.push("assetTypeId=" + assetTypeId);



  if (queryStr.length > 0) {
    array.push("?");
    array.push(queryStr.join("&"));
  }

  return this.httpClient.get<ValueStates>(array.join(""), {
  // return this.http.get(array.join(""), {
    headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
  }).map(data => {
    console.log(data);
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

  public findAssetTypes(searchStr: string, pageSize:number): Observable<AssetTypeStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-types");

    let queryStr = [];
    if (searchStr) {
      queryStr.push("q=" + searchStr);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + searchStr);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<AssetTypeStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public findAssetTypeClassId(searchStr: string, pageSize:number): Observable<AssetTypeClassStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-types/asset-type-classes");

    let queryStr = [];
    if (searchStr) {
      queryStr.push("q=" + searchStr);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + searchStr);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<AssetTypeClassStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  private queryStringExists(searchStr: string):boolean {
    return (searchStr) ? true : false;
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

  public addValueState(valueState: ValueState): Observable<ValueState> {
    let url = `${this.hostPort}/asset-types/values`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<ValueState>(url, valueState.toJson(), {headers: headers})
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
    let url = `${this.hostPort}/asset-types/values/${valueId}`;
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

  public updateValue(valueState: ValueState): Observable<number> {
    let url = `${this.hostPort}/asset-types/values/${valueState.valueId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put<number>(url, valueState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

}
