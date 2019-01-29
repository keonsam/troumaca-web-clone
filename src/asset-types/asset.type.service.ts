import {AssetTypeRepository} from './asset.type.repository';
import {Observable} from 'rxjs';
import {AssetType} from './asset.type';
import {AssetTypes} from './asset.types';

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, undefined);
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, undefined);
  }

  // OTHERS

  // findInstancesOf(searchStr: string, pageSize: number): Observable<AssetTypeInstance[]> {
  //   return this.assetTypeRepository.findInstancesOf(searchStr, pageSize);
  // }
  //
  // findSubTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
  //   return this.assetTypeRepository.findSubTypes(searchStr, pageSize);
  // }
}
