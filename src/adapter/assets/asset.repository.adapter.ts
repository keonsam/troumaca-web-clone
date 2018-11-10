import {Observable} from 'rxjs';
import {AssetRepository} from '../../assets/asset.repository';
import {AssetClient} from '../../client/asset/asset.client';
import {Asset} from '../../assets/asset';
import {Assets} from '../../assets/assets';
import {AssetKinds} from '../../assets/asset.kinds';
import {AssetType} from '../../asset-types/asset.type';
import {Site} from "../../site/site";
import {User} from "../../parties/user";

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

  public getAssetKinds(): Observable<AssetKinds> {
    return this.assetClient.getAssetKinds();
  }

  public findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetClient.findAssetTypes(searchStr, pageSize);
  }

  public findUnionOfPhysicalSites(searchStr: string, pageSize: number): Observable<Site[]> {
    return this.assetClient.findUnionOfPhysicalSites(searchStr, pageSize);
  }

  public findPersons(searchStr: string, pageSize: number): Observable<User[]> {
    return this.assetClient.findPersons(searchStr, pageSize);
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
