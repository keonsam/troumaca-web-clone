import {AssetTypeRepository} from '../../asset-types/asset.type.repository';
import {AssetTypesClient} from '../../client/asset-type/asset.types.client';
import {Observable} from 'rxjs';
import {AssetType} from '../../asset-types/asset.type';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {Value} from '../../asset-types/value';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';

export class AssetTypeRepositoryAdapter extends AssetTypeRepository {

  constructor(private assetTypesClient: AssetTypesClient) {
    super();
  }

  public getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
    return this.assetTypesClient.getAssetTypes(pageNumber, pageSize, sortOrder);
  }

  public getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]> {
    return this.assetTypesClient.getAssignedAttributes(assetTypeClassId);
  }

  public getAssetType(assetTypeId: string): Observable<AssetType> {
    return this.assetTypesClient.getAssetTypeState(assetTypeId);
  }

  public findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]> {
    return this.assetTypesClient.findAssetTypeClassId(searchStr, pageSize);
  }

  public addAssetType(assetType: AssetType, values: Value[]): Observable<AssetType> {
    return this.assetTypesClient.addAssetTypeState(assetType, values);
  }

  public deleteAssetType(assetTypeId: string): Observable<number> {
    return this.assetTypesClient.deleteAssetType(assetTypeId);
  }

  public updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number> {
    return this.assetTypesClient.updateAssetType(assetTypeId,  assetType, values);
  }

}
