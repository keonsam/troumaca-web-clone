import {AssetTypeClassClient} from "./asset.type.class.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private http: HttpClient,
              private hostPort:string
  ) {
    super();
  }

  public getAssetTypeClasses(): Observable<AssetTypeClassState[]> {
    throw new Error("Method not implemented.");
  }

  public addAssetTypeClass(assetTypeClassState: AssetTypeClassState) : Observable<AssetTypeClassState> {
    let array = [];
    array.push(this.hostPort);
    array.push("/asset-type-classes");
    console.log(assetTypeClassState);
    return this.http.post(array.join(""), assetTypeClassState, {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }
}
