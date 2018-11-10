import {Observable} from 'rxjs';
import {Assets} from './assets';
import {AssetKinds} from './asset.kinds';
import {Asset} from './asset';
import {AssetType} from '../asset-types/asset.type';
import {Site} from "../site/site";
import {User} from "../parties/user";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;
  public abstract getAsset(attributeId: string): Observable<Asset>;
  public abstract getAssetKinds(): Observable<AssetKinds>;

  public abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;
  public abstract findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<Site[]>;
  public abstract findPersons(searchStr: string, pageSize: number): Observable<User[]>;

  public abstract addAsset(assetModel: Asset): Observable<Asset>;
  public abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  public abstract deleteAsset(assetId): Observable<number>;
}
