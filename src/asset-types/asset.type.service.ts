import {AssetTypeRepository} from './asset.type.repository';
import {Observable} from 'rxjs';
import {AssetType} from './asset.type';
import {AssetTypes} from './asset.types';
import {Instance} from './instance';
import {Brand} from '../brands/brand';

export class AssetTypeService {
  constructor(private assetTypeRepository: AssetTypeRepository) {
  }

  findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
    return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
  }

  getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.assetTypeRepository.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.assetTypeRepository.getAssetType(assetTypeId);
  }

  addAssetType(assetType: AssetType): Observable<AssetType> {
    return this.assetTypeRepository.addAssetType(assetType);
  }

  deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypeRepository.deleteAssetType(assetTypeId);
  }

  updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
    return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
  }

  // OTHERS

  findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
    return this.assetTypeRepository.findInstances(searchStr, pageSize);
  }

  findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
    return this.assetTypeRepository.findBrands(searchStr, pageSize);
  }
}
