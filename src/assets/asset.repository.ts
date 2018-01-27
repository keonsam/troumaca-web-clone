import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {Asset} from "./asset";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber:number):Observable<Assets>;
  public abstract getAssetKinds():Observable<AssetKinds>;
  public abstract addInventoryAsset(assetModel: Asset):Observable<Asset>;
  public abstract addDiscreteAsset(assetModel: Asset):Observable<Asset>;
}
