import {AssetRepository} from './asset.repository';
import {BehaviorSubject, Observable} from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
import {AssetSpecification} from "./asset.specification";
import {AssetBrand} from "./asset.brand";
import {AssetCharacteristics} from "./asset.characteristics";

export class AssetService {

  public assetSpecificationState = new BehaviorSubject<string>('');
  public assetBrandState = new BehaviorSubject<string>('');
  public assetCharacteristicsState = new BehaviorSubject<string>('');

  constructor(private assetRepository: AssetRepository) {
  }

  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetRepository.getAssets(pageNumber, pageSize, sortOrder);
  }

  public getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAsset(assetId);
  }

  public getAssetSpecById(assetId: string): Observable<AssetSpecification> {
    return this.assetRepository.getAssetSpecById(assetId);
  }

  public getAssetBrandById(assetId: string): Observable<AssetBrand> {
    return this.assetRepository.getAssetBrandById(assetId);
  }

  public getAssetCharacteristicsById(assetId: string): Observable<AssetCharacteristics> {
    return this.assetRepository.getAssetCharacteristicsById(assetId);
  }

  public addAsset(assetModel: Asset): Observable<Asset> {
    return this.assetRepository.addAsset(assetModel);
  }

  public addAssetSpec(assetModel: AssetSpecification): Observable<AssetSpecification> {
    return this.assetRepository.addAssetSpec(assetModel);
  }

  public addAssetBrand(assetModel: AssetBrand): Observable<AssetBrand> {
    return this.assetRepository.addAssetBrand(assetModel);
  }

  public addAssetCharacteristics(assetModel: AssetCharacteristics): Observable<AssetCharacteristics> {
    return this.assetRepository.addAssetCharacteristics(assetModel);
  }

  public updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  public deleteAsset(assetId: string): Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

  // others

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.assetRepository.findAssets(searchStr, pageSize);
  }

}
