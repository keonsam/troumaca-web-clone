import {AssetTypeClassClient} from "./asset.type.class.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import {AssetTypeClassStates} from "./asset.type.class.states";


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

  public getAssetTypeClass(assetTypeClassId: string): Observable<AssetTypeClassState>{
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .get<AssetTypeClassState>(url, {headers:headers})
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

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState) : Observable<AssetTypeClassState> {
    let url = `${this.hostPort}/asset-type-classes`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .post(url, assetTypeClassState.toJson(), {headers: headers})
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
  public updateAssetTypeClass(assetTypeClassId: string, assetTypeClassState: AssetTypeClassState): Observable<number> {
    let url = `${this.hostPort}/asset-type-classes/${assetTypeClassId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.httpClient
    .put(url, assetTypeClassState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }
}
