import {AssetNameTypeRepository} from '../../asset-name-types/asset.name.type.repository';
import {AssetNameTypeClient} from '../../client/asset-name-types/asset.name.type.client';
import {Observable} from 'rxjs';
import {AssetNameTypes} from '../../asset-name-types/asset.name.types';
import {AssetNameType} from '../../asset-name-types/asset.name.type';

export class AssetNameTypeRepositoryAdapter extends  AssetNameTypeRepository {

  constructor(private assetNameTypeClient: AssetNameTypeClient) {
    super();
  }

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
    return this.assetNameTypeClient.findAssetNameTypes(searchStr, pageSize);
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetNameTypes> {
    return this.assetNameTypeClient.getAssetNameTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetNameType(assetNameTypeId: string): Observable<AssetNameType> {
    return this.assetNameTypeClient.getAssetNameType(assetNameTypeId);
  }

  addAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
    return this.assetNameTypeClient.addAssetNameType(assetNameType);
  }

  updateAssetNameType(assetNameType: AssetNameType): Observable<number> {
    return this.assetNameTypeClient.updateAssetNameType(assetNameType);
  }

  deleteAssetNameType(assetNameTypeId: string): Observable<number> {
    return this.assetNameTypeClient.deleteAssetNameType(assetNameTypeId);
  }

}
