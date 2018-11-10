import {Observable} from 'rxjs';
import {Assets} from "../../assets/assets";
import {Asset} from "../../assets/asset";
import {AssetKinds} from "../../assets/asset.kinds";
import {Site} from "../../site/site";
import {User} from "../../parties/user";
import {AssetType} from "../../asset-types/asset.type";

export abstract class AssetClient {
  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;
  public abstract getAsset(assetId: string): Observable<Asset>;
  public abstract getAssetKinds(): Observable<AssetKinds>;

  public abstract findAssetTypes(searchStr: string, pageSize: number): Observable <AssetType[]>;
  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable <Site[]>;
  public abstract findPersons(searchStr: string, pageSize: number): Observable <User[]>;

  public abstract addAsset(assetState: Asset): Observable<Asset>;
  public abstract updateAsset(assetId: string, assetState: Asset): Observable<number>;
  public abstract deleteAsset(assetId: string): Observable<number>;

}
