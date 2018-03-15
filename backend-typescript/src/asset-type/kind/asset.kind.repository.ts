import {AssetKind} from "./asset.kind";
import {Observable} from "rxjs/Observable";

export interface AssetKindRepository {
  getAssetKinds():Observable<AssetKind[]>
}
