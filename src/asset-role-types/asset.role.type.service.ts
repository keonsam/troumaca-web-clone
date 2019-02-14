import {AssetRoleType} from './asset.role.type';
import {Observable} from 'rxjs';
import {AssetRoleTypes} from './asset.role.types';
import {AssetRoleTypeRepository} from './asset.role.type.repository';

export class AssetRoleTypeService {

  constructor(private assetRoleTypeRepository: AssetRoleTypeRepository) {}

  findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
    return this.assetRoleTypeRepository.findAssetRoleTypes(searchStr, pageSize);
  }

  getAssetRoleTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetRoleTypes> {
    return this.assetRoleTypeRepository.getAssetRoleTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetRoleType(assetRoleTypeId: string): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.getAssetRoleType(assetRoleTypeId);
  }

  addAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
    return this.assetRoleTypeRepository.addAssetRoleType(assetRoleType);
  }

  updateAssetRoleType(assetRoleType: AssetRoleType): Observable<number> {
    return this.assetRoleTypeRepository.updateAssetRoleType(assetRoleType);
  }

  deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
    return this.assetRoleTypeRepository.deleteAssetRoleType(assetRoleTypeId);
  }

}
