import {Observable} from 'rxjs';
import {AssetRepository} from '../../assets/asset.repository';
import {AssetClient} from '../../client/asset/asset.client';
import {Asset} from '../../assets/asset';
import {Assets} from '../../assets/assets';

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

  public findAssets(searchStr: string, pageSize: number): Observable<Asset[]> {
    return this.assetClient.findAssets(searchStr, pageSize);
  }

  public addAsset(asset: Asset): Observable<Asset> {
    return this.assetClient.addAsset(asset);
  }

  public updateAsset(assetId: string, asset: Asset): Observable<number> {
    return this.assetClient.updateAsset(assetId, asset);
  }

  public deleteAsset(assetId: string): Observable<number> {
    return this.assetClient.deleteAsset(assetId);
  }

}
