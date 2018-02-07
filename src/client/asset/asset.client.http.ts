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


  public getAssets(pageNumber:number): Observable<AssetStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/v2/assets");
    console.log(array);
    if (pageNumber) {
      array.push("?");
      array.push("pageNumber=" + pageNumber);
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

  public addInventoryAsset(assetState: AssetState): Observable<AssetState> {
    let array = [];
    array.push(this.hostPort);
    array.push("/v2/assets");

    return this.http.post(array.join(""), assetState.toJson(), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public addDiscreteAsset(assetState: AssetState): Observable<AssetState> {
    let array = [];
    array.push(this.hostPort);
    array.push("/v2/assets");

    return this.http.post(array.join(""), assetState.toJson(), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }
}
