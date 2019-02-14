import {Observable} from 'rxjs';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetType} from '../../asset-types/asset.type';
import {Instance} from '../../asset-types/instance';

export abstract class AssetTypesClient {
  abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;
  abstract getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes>;
  abstract getAssetTypeState(assetTypeId: string): Observable<AssetType>;
  abstract addAssetTypeState(assetTypeState: AssetType): Observable<AssetType>;
  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetType): Observable<number>;
  // OTHERS
  abstract findInstances(searchStr: string, pageSize: number): Observable<Instance[]>;
}
