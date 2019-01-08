import {Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
import {AssetSpecification} from "./asset.specification";
import {AssetBrand} from "./asset.brand";
import {AssetCharacteristics} from "./asset.characteristics";

export abstract class AssetRepository {

  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;

  public abstract getAsset(attributeId: string): Observable<Asset>;
  abstract getAssetSpecById(assetId: string): Observable<AssetSpecification>;
  abstract getAssetBrandById(assetId: string): Observable<AssetBrand>;
  abstract getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics>;

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract addAsset(assetModel: Asset): Observable<Asset>;
  abstract addAssetSpec(assetModel: AssetSpecification): Observable<AssetSpecification>;
  abstract addAssetBrand(assetModel: AssetBrand): Observable<AssetBrand>
  abstract addAssetCharacteristics(assetModel: AssetCharacteristics): Observable<AssetCharacteristics>;

  public abstract updateAsset(assetId: string, asset: Asset): Observable<number>;
  public abstract deleteAsset(assetId): Observable<number>;
}
