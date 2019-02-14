import {AssetNameType} from './asset.name.type';
import {Observable} from 'rxjs';
import {AssetNameTypes} from './asset.name.types';
import {AssetNameTypeRepository} from './asset.name.type.repository';

export class AssetNameTypeService {

  constructor(private assetNameTypeRepository: AssetNameTypeRepository) {}

  findAssetNameTypes(searchStr: string, pageSize: number): Observable<AssetNameType[]> {
    return this.assetNameTypeRepository.findAssetNameTypes(searchStr, pageSize);
  }

  getAssetNameTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetNameTypes> {
    return this.assetNameTypeRepository.getAssetNameTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetNameType(assetNameTypeId: string): Observable<AssetNameType> {
    return this.assetNameTypeRepository.getAssetNameType(assetNameTypeId);
  }

  addAssetNameType(assetNameType: AssetNameType): Observable<AssetNameType> {
    return this.assetNameTypeRepository.addAssetNameType(assetNameType);
  }

  updateAssetNameType(assetNameType: AssetNameType): Observable<number> {
    return this.assetNameTypeRepository.updateAssetNameType(assetNameType);
  }

  deleteAssetNameType(assetNameTypeId: string): Observable<number> {
    return this.assetNameTypeRepository.deleteAssetNameType(assetNameTypeId);
  }

}
