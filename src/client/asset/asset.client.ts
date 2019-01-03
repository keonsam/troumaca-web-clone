import {Observable} from 'rxjs';
import {Assets} from "../../assets/assets";
import {Asset} from "../../assets/asset";

export abstract class AssetClient {
  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;
  public abstract getAsset(assetId: string): Observable<Asset>;

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract addAsset(assetState: Asset): Observable<Asset>;
  public abstract updateAsset(assetId: string, assetState: Asset): Observable<number>;
  public abstract deleteAsset(assetId: string): Observable<number>;

}
