import {Observable} from "rxjs/Observable";
import {AssetTypeClassState} from "./asset.type.class.state";

export abstract class AssetTypeClassClient {
  abstract getAssetTypeClasses() :Observable<AssetTypeClassState[]>;

  abstract addAssetTypeClass(assetTypeClassState: AssetTypeClassState):Observable<AssetTypeClassState>;
}
