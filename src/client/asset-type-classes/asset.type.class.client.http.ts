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
              private http: HttpClient,
              private hostPort:string
  ) {
    super();

    this.jsonConvert = new JsonConvert();
    this.jsonConvert.operationMode = OperationMode.LOGGING; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }

  public getAssetTypeClasses(pageNumber?: number): Observable<AssetTypeClassStates> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes");
    console.log(array);
    if (pageNumber) {
      array.push("?");
      array.push("pageNumber=" + pageNumber);
    }

    return this.http.get<AssetTypeClassStates>(array.join(""), {
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

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState) : Observable<AssetTypeClassState> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes");
    return this.http.post(array.join(""), assetTypeClassState.toJson(), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

  public deleteAssetTypeClass(id: string): Observable<string> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes");
    return this.http.delete(array.join(""),{
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }
}
