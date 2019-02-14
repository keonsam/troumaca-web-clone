import {Observable} from 'rxjs';
import {AssetRepository} from '../../assets/asset.repository';
import {AssetClient} from '../../client/asset/asset.client';
import {Asset} from '../../assets/asset';
import {Assets} from '../../assets/assets';
import {AssetType} from '../../asset-types/asset.type';
import {Brand} from '../../brands/brand';

export class AssetRepositoryAdapter extends AssetRepository {

  constructor(private assetClient: AssetClient) {
    super();
  }

  getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetClient.getAssets(pageNumber, pageSize, sortOrder);
  }

  getAsset(assetId: string): Observable<Asset> {
    return this.assetClient.getAsset(assetId);
  }

  addAsset(asset: Asset): Observable<Asset> {
    return this.assetClient.addAsset(asset);
  }

  updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetClient.updateAsset(assetId, asset);
  }

  deleteAsset(assetId: string): Observable<number> {
    return this.assetClient.deleteAsset(assetId);
  }

  // OTHERS

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetClient.findAssetTypes(searchStr, pageSize);
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    return this.assetClient.findBrands(searchStr, pageSize);
  }

}
