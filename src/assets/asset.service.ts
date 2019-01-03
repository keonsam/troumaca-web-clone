import {AssetRepository} from './asset.repository';
import {Observable} from 'rxjs';
import {Assets} from './assets';
import {AssetKinds} from './asset.kinds';
import {AssetType} from '../asset-types/asset.type';
import {Asset} from './asset';
import {Site} from "../site/site";
import {User} from "../parties/user";

export class AssetService {

  constructor(private assetRepository: AssetRepository) {
  }

  public getAssets(pageNumber: number, pageSize: number, sortOrder: string): Observable<Assets> {
    return this.assetRepository.getAssets(pageNumber, pageSize, sortOrder);
  }

  public getAssetById(assetId: string): Observable<Asset> {
    return this.assetRepository.getAsset(assetId);
  }

  public addAsset(assetModel: Asset): Observable<Asset> {
    return this.assetRepository.addAsset(assetModel);
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
