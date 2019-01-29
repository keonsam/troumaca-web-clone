import {Observable} from 'rxjs';
import {Assets} from '../../assets/assets';
import {Asset} from '../../assets/asset';
import {AssetType} from '../../asset-types/asset.type';
import {Brand} from '../../brands/brand';

export abstract class AssetClient {
  abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;
  abstract getAsset(assetId: string): Observable<Asset>;
  abstract addAsset(assetState: Asset): Observable<Asset>;
  abstract updateAsset(assetId: string, assetState: Asset): Observable<number>;
  abstract deleteAsset(assetId: string): Observable<number>;

  // OTHERS
  abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;
  abstract findBrands(searchStr: string, pageSize: number): Observable<Brand[]>;
}
