import {AssetTypeClassClient} from "./asset.type.class.client";
import {UUIDGenerator} from "../../uuid.generator";
import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";

export class AssetTypeClassClientHttp extends AssetTypeClassClient {

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  public getAssetTypeClasses(): Observable<AssetTypeClassState[]> {
    throw new Error("Method not implemented.");
  }

}