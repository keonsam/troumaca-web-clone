import {Observable} from 'rxjs';
import {AssetRepository} from '../../assets/asset.repository';
import {AssetClient} from '../../client/asset/asset.client';
import {Asset} from '../../assets/asset';
import {Assets} from '../../assets/assets';
import {AssetSpecification} from "../../assets/asset.specification";
import {AssetBrand} from "../../assets/asset.brand";
import {AssetCharacteristics} from "../../assets/asset.characteristics";

export class AssetRepositoryAdapter extends AssetRepository {

  constructor(private assetClient: AssetClient) {
    super();
  }

  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetClient.getAssets(pageNumber, pageSize, sortOrder);
  }

  public getAsset(assetId: string): Observable<Asset> {
    return this.assetClient.getAsset(assetId);
  }

  getAssetSpecById(assetId: string): Observable<AssetSpecification> {
    return this.assetClient.getAssetSpecById(assetId);
  }

  getAssetBrandById(assetId: string): Observable<AssetBrand> {
    return this.assetClient.getAssetBrandById(assetId);
  }

  getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
    return this.assetClient.getAssetCharacteristicsById(assetId);
  }

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.assetClient.findAssets(searchStr, pageSize);
  }

  public addAsset(asset: Asset): Observable<Asset> {
    return this.assetClient.addAsset(asset);
  }

  public addAssetSpec(assetModel: AssetSpecification): Observable<AssetSpecification> {
    return this.assetClient.addAssetSpec(assetModel);
  }

  public addAssetBrand(assetModel: AssetBrand): Observable<AssetBrand> {
    return this.assetClient.addAssetBrand(assetModel);
  }

  public addAssetCharacteristics(assetModel: AssetCharacteristics): Observable<AssetCharacteristics> {
    return this.assetClient.addAssetCharacteristics(assetModel);
  }

  public updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetClient.updateAsset(assetId, asset);
  }

  public deleteAsset(assetId: string): Observable<number> {
    return this.assetClient.deleteAsset(assetId);
  }

}
