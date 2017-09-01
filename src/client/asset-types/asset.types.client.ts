import {AssetTypeState} from "./asset.type.state";
import {Observable} from "rxjs/Observable";

export abstract class AssetTypesClient {
  abstract getAssetTypes():Observable<AssetTypeState[]>;
}