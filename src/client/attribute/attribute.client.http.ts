import {AttributeClient} from "./attribute.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AttributeState} from "./attribute.state";
import {AttributeStates} from "./attribute.states";
import {DataTypeStates} from "./data.type.states"
import {UnitOfMeasureState} from "../unit-of-measure/unit.of.measure.state";

export class AttributeClientHttp extends AttributeClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort:string) {
    super();
  }

  public getDataTypes(): Observable<DataTypeStates>{
    let url = `${this.hostPort}/data-types`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<DataTypeStates>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }
  public getAttributesStates(pageNumber:number, pageSize:number, sortOrder:string):Observable<AttributeStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/attributes");

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

    return this.httpClient.get<AttributeStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public getAttributeState(attributeId: string): Observable<AttributeState>{
    let url = `${this.hostPort}/attributes/${attributeId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AttributeState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    let array = [];
    array.push(this.hostPort);
    array.push("/find-unit-of-measures");

    let queryStr = [];
    if (searchStr) {
      queryStr.push("q=" + searchStr);
    }

    if (pageSize) {
      queryStr.push("pageSize=" + pageSize);
    }

    if (queryStr.length > 0) {
      array.push("?");
      array.push(queryStr.join("&"));
    }

    return this.httpClient.get<UnitOfMeasureState[]>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public addAttribute(attributeState: AttributeState): Observable<AttributeState> {
    let url = `${this.hostPort}/attributes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post<AttributeState>(url, attributeState.toJson(), {headers: headers})
    .map(data => {
      return data;
    });
  }

 public updateAttribute(attributeId: string, attributeState: AttributeState): Observable<number> {
   let url = `${this.hostPort}/attributes/${attributeId}`;
   let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
   return this.httpClient
   .put<number>(url, attributeState.toJson(), {headers:headers})
   .map(data => {
     return data;
   });
 }

 public deleteAttribute(attributeId: string): Observable<number> {
   let url = `${this.hostPort}/attributes/${attributeId}`;
   let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
   return this.httpClient
   .delete<number>(url, {headers:headers})
   .map(data => {
     return data;
   });
 }
}
