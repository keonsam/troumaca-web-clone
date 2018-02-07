import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {Asset} from "./asset";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<Assets>;
  public abstract getAssetKinds():Observable<AssetKinds>;
  public abstract addAsset(assetModel: Asset):Observable<Asset>;
}
