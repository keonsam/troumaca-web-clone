import {AssetIdentifierType} from './asset.identifier.type';
import {Observable} from 'rxjs';
import {AssetIdentifierTypes} from './asset.identifier.types';
import {AssetIdentifierTypeRepository} from './asset.identifier.type.repository';

export class AssetIdentifierTypeService {

  constructor(private assetIdentifierTypeRepository: AssetIdentifierTypeRepository) {}

  findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
    return this.assetIdentifierTypeRepository.findAssetIdentifierTypes(searchStr, pageSize);
  }

  getAssetIdentifierTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetIdentifierTypes> {
    return this.assetIdentifierTypeRepository.getAssetIdentifierTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetIdentifierType(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
    return this.assetIdentifierTypeRepository.getAssetIdentifierType(assetIdentifierTypeId);
  }

  addAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
    return this.assetIdentifierTypeRepository.addAssetIdentifierType(assetIdentifierType);
  }

  updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<number> {
    return this.assetIdentifierTypeRepository.updateAssetIdentifierType(assetIdentifierType);
  }

  deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
    return this.assetIdentifierTypeRepository.deleteAssetIdentifierType(assetIdentifierTypeId);
  }

}
