import {AssetRepository} from './asset.repository';
import { Observable } from 'rxjs';
import {Assets} from './assets';
import {Asset} from './asset';
import { AssetType} from '../asset-types/asset.type';
import {Brand} from '../brands/brand';

export class AssetService {

  constructor(private assetRepository: AssetRepository) {
  }

  getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetRepository.getAssets(pageNumber, pageSize, sortOrder);
  }

  getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAsset(assetId);
  }

  addAsset(assetModel: Asset): Observable<Asset> {
    return this.assetRepository.addAsset(assetModel);
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetRepository.updateAsset(assetId, asset);
  }

  deleteAsset(assetId: string): Observable<number> {
    return this.assetRepository.deleteAsset(assetId);
  }

  // others

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetRepository.findAssetTypes(searchStr, pageSize);
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    return this.assetRepository.findBrands(searchStr, pageSize);
  }

}
