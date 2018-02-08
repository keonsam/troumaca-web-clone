import {Observable} from "rxjs/Observable";
import {Assets} from "./assets";
import {AssetKinds} from "./asset.kinds";
import {Asset} from "./asset";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber:number, pageSize:number, sortOrder:string):Observable<Assets>;
  public abstract getAsset(attributeId: string): Observable<Asset>;
  public abstract getAssetKinds():Observable<AssetKinds>;
  public abstract addAsset(assetModel: Asset):Observable<Asset>;
  public abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  public abstract deleteAsset(assetId): Observable<number>;
}
