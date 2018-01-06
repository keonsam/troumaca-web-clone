import {AssetTypesClient} from "./asset.types.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AssetTypeStates} from "./asset.type.states";

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient,
              private uuidGenerator: UUIDGenerator,
              private hostPort:string) {
    super();
  }

  getAssetTypes(): Observable<AssetTypeState[]> {
    let generateUUID = this.uuidGenerator.generateUUID();
    return null;
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

  private queryStringExists(searchStr: string):boolean {
    return (searchStr) ? true : false;
  }


}