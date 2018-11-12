import {AssetTypeRepository} from './asset.type.repository';
import {Observable} from 'rxjs';
import {AssetType} from './asset.type';
import {AssetTypes} from './asset.types';
import {Value} from './value';
import {AssetTypeClass} from '../asset-type-classes/asset.type.class';
import {AssignedAttribute} from '../asset-type-classes/assigned.attribute';
import {AssetTypeResponse} from './asset.type.response';

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  public getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  public getAssetType(assetTypeId: string): Observable<AssetTypeResponse> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    return this.assetTypeRepository.findAssetTypeClassId(searchStr, pageSize);
  }

  public addAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType, values);
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType, values);
  }

  // OTHERS

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assetTypeRepository.getAssignedAttributes(assetTypeClassId);
  }
}
