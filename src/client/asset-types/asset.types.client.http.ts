import {AssetTypesClient} from "./asset.types.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeState} from "./asset.type.state";
import {HttpClient} from "@angular/common/http";

export class AssetTypesClientHttp extends AssetTypesClient {

  constructor(private httpClient: HttpClient, private uuidGenerator: UUIDGenerator) {
    super();
  }

  getAssetTypes(): Observable<AssetTypeState[]> {
    let generateUUID = this.uuidGenerator.generateUUID();
    return null;
  }

}