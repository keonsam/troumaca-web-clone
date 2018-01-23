import {AssetTypeClass} from "./asset.type.class";
import {Observable} from "rxjs/Observable";

export abstract class AssetTypeClassRepository {
  abstract getAssetTypeClasses():Observable<AssetTypeClass[]>;

  abstract addAssetTypeClass(assetTypeClass: AssetTypeClass): Observable<AssetTypeClass>;
}
