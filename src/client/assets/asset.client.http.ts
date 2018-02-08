import {AssetClient} from "./asset.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AssetStates} from "./asset.states";
import {JsonConvert, OperationMode, ValueCheckingMode} from "json2typescript";
import {AssetKindStates} from "./asset.kind.states";
import {AssetState} from "./asset.state";

export class AssetClientHttp extends AssetClient {

  private jsonConvert: JsonConvert;

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort:string) {
    super();

    this.jsonConvert = new JsonConvert();
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }


  public getAssets(pageNumber:number, pageSize:number, sortOrder:string): Observable<AssetStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/assets");

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

    return this.http.get<AssetStates>(array.join(""), {
    // return this.http.get(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      // let assetStates:AssetStates;
      // assetStates = this.jsonConvert.deserializeObject(data, AssetStates);
      // assetStates = mapObjectProps(data, new AssetStates());
      //let assetStates:AssetStates = new AssetStates();
      // assetStates.page = value.page;
      // assetStates.sort = value.sort;
      // assetStates.assets = value.assets;
      // console.log(value);
      // console.log(assetStates);
      return data;
      // return deserialize(AssetStates, value);
    });
  }

  public getAssetState(assetId: string): Observable<AssetState>{
    let url = `${this.hostPort}/assets/${assetId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.http
    .get<AssetState>(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

  public getAssetKinds(): Observable<AssetKindStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset/kinds");

    return this.http.get<AssetKindStates>(array.join(""), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public addAsset(assetState: AssetState): Observable<AssetState> {
    let array = [];

    array.push(this.hostPort);
    array.push("/assets");

    return this.http.post(array.join(""), assetState.toJson(), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public updateAsset(assetId: string, assetState: AssetState): Observable<number> {
    let url = `${this.hostPort}/assets/${assetId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.http
    .put(url, assetState.toJson(), {headers:headers})
    .map(data => {
      return data;
    });
  }

  public deleteAsset(assetId: string): Observable<number> {
    let url = `${this.hostPort}/assets/${assetId}`;
    let headers:HttpHeaders = new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID());
    return this.http
    .delete(url, {headers:headers})
    .map(data => {
      return data;
    });
  }

}
