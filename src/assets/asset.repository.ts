import {Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
import {AssetType} from '../asset-types/asset.type';
import {Brand} from '../brands/brand';

export abstract class AssetRepository {

  abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;

  abstract getAsset(attributeId: string): Observable<Asset>;
  abstract addAsset(assetModel: Asset): Observable<Asset>;
  abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  abstract deleteAsset(assetId): Observable<number>;

  // OTHERS
  abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;
  abstract findBrands(searchStr: string, pageSize: number): Observable<Brand[]>;
}
