import {AssetTypeClassClient} from "./asset.type.class.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import {AssetTypeClassStates} from "./asset.type.class.states";
import {AttributeStates} from "../attribute/attribute.states";
import {AttributeState} from "../attribute/attribute.state";
import {DataTypeStates} from "../attribute/data.type.states";

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  private jsonConvert: JsonConvert;

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string
  ) {
    super();

    this.jsonConvert = new JsonConvert();
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }

  public getDataTypes(): Observable<DataTypeStates>{
    let url = `${this.hostPort}/asset-type-classes/data-types`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<DataTypeStates>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassState>{
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AssetTypeClassState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getAvailableAttribute(attributeId: string): Observable<AttributeState>{
    let url = `${this.hostPort}/asset-type-classes/attributes/${attributeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AttributeState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes");

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

    return this.httpClient.get<AssetTypeClassStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes/attributes");

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

    if(assignedArray) {
      queryStr.push("assignedArray=" + assignedArray)
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<AttributeStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getAssignedAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes/assigned-attributes");

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

    if(assignedArray) {
      queryStr.push("assignedArray=" + assignedArray)
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<AttributeStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState) : Observable<AssetTypeClassState> {
    let url = `${this.hostPort}/asset-type-classes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post(url, assetTypeClassState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public addAvailableAttribute(availableAttributeState: AttributeState) : Observable<AttributeState> {
    let url = `${this.hostPort}/asset-type-classes/attributes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post(url, availableAttributeState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

  public deleteAssetTypeClass(assetTypeClassId: string): Observable<number> {
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteAvailableAttribute(attributeId: string): Observable<number> {
    let url = `${this.hostPort}/asset-type-classes/attributes/${attributeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .delete(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState): Observable<number> {
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put(url, assetTypeClassState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public updateAvailableAttribute(attributeId: string, availableAttributeState: AttributeState): Observable<number> {
    let url = `${this.hostPort}/asset-type-classes/attributes/${attributeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put(url, availableAttributeState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

}
