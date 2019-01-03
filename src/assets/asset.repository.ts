import {Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';

export abstract class AssetRepository {

  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;
  public abstract getAsset(attributeId: string): Observable<Asset>;

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract addAsset(assetModel: Asset): Observable<Asset>;
  public abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  public abstract deleteAsset(assetId): Observable<number>;
}
