import {Observable} from 'rxjs';
import {Assets} from "../../assets/assets";
import {Asset} from "../../assets/asset";
import {AssetSpecification} from "../../assets/asset.specification";
import {AssetBrand} from "../../assets/asset.brand";
import {AssetCharacteristics} from "../../assets/asset.characteristics";

export abstract class AssetClient {
  public abstract getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets>;

  public abstract getAsset(assetId: string): Observable<Asset>;
  abstract getAssetSpecById(assetId: string): Observable<AssetSpecification>;
  abstract getAssetBrandById(assetId: string): Observable<AssetBrand>;
  abstract getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics>;

  public abstract findAssets(searchStr: string, pageSize: number): Observable<Asset[]>;

  public abstract addAsset(assetState: Asset): Observable<Asset>;
  abstract addAssetSpec(assetModel: AssetSpecification): Observable<AssetSpecification>;
  abstract addAssetBrand(assetModel: AssetBrand): Observable<AssetBrand>
  abstract addAssetCharacteristics(assetModel: AssetCharacteristics): Observable<AssetCharacteristics>;

  public abstract updateAsset(assetId: string, assetState: Asset): Observable<number>;
  public abstract deleteAsset(assetId: string): Observable<number>;

}
