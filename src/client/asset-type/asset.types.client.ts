import {Observable} from 'rxjs';
import {AssetTypeClass} from '../../asset-type-classes/asset.type.class';
import {AssignedAttribute} from '../../asset-type-classes/assigned.attribute';
import {AssetTypes} from '../../asset-types/asset.types';
import {AssetType} from '../../asset-types/asset.type';
import {Value} from '../../asset-types/value';

export abstract class AssetTypesClient {
  abstract getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes>;
  abstract getAssetTypeState(assetTypeId: string): Observable<AssetType>;
  abstract findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;
  abstract addAssetTypeState(assetTypeState: AssetType, values: Value[]): Observable<AssetType>;
  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract updateAssetType(assetTypeId: string, assetTypeState: AssetType, values: Value[]): Observable<number>;
  // OTHERS
  abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]>;
}
