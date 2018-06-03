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
import {AssignedAttributeState} from "./assigned.attribute.state";
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";
import {AssetTypeClassResponse} from "../../asset-type-classes/asset.type.class.response";
import { map, reduce, somethingElse } from "underscore";

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
    let url = `${this.hostPort}/data-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<DataTypeStates>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    let url = `${this.hostPort}find-unit-of-measures?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasureState[]>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassResponse>{
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
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
    let url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AttributeState>(url, httpOptions)
    .map(data => {
      return data;
    });
  }

  public getAssetTypeClasses(pageNumber: number, pageSize:number, sortOrder:string): Observable<AssetTypeClassStates> {
    let url = `${this.hostPort}/asset-type-classes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AssetTypeClassStates>(url, httpOptions).map(assetTypeClasses => {
      return assetTypeClasses;
    });
  }

  public getAvailableAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    let url = `${this.hostPort}/available-attributes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&assignedArray=${assignedArray}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AttributeStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public getAssignAttributes(pageNumber: number, pageSize:number, sortOrder:string, assignedArray: string[]): Observable<AttributeStates> {
    let url = `${this.hostPort}/assigned-attributes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&assignedArray=${assignedArray}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AttributeStates>(url, httpOptions).map(data => {
      return data;
    });
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState, assignedAttributes: AssignedAttributeState[]) : Observable<AssetTypeClassState> {
    let url = `${this.hostPort}/asset-type-classes`;
    let newAssetTypeClass = assetTypeClassState.toJson();
    let newAssignedAttributes = map(assignedAttributes, next => {
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

  public addAttribute(attributeState: AttributeState) : Observable<AttributeState> {
    let url = `${this.hostPort}/attributes`;
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
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
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
    let url = `${this.hostPort}/attributes/${attributeId}`;
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
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let newAssetTypeClass = assetTypeClassState.toJson();
    let newAssignedAttributes = map(assignedAttributes, next => {
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
    let url = `${this.hostPort}/attributes/${attributeId}`;
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
    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }

}
