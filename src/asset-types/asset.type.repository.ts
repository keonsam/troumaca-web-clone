import {Observable} from 'rxjs';
import {AssetType} from './asset.type';
import {AssetTypes} from './asset.types';
import {Value} from './value';
import {AssetTypeClass} from '../asset-type-classes/asset.type.class';
import {AssignedAttribute} from '../asset-type-classes/assigned.attribute';
import {AssetTypeResponse} from './asset.type.response';

export abstract class AssetTypeRepository {
  abstract getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes>;
  abstract getAssetType(assetTypeId: string): Observable<AssetTypeResponse>;
  abstract findAssetTypeClassId(searchStr: string, pageSize: number): Observable<AssetTypeClass[]>;
  abstract addAssetType(assetType: AssetType, values: Value[]): Observable<AssetType>;
  abstract deleteAssetType(assetTypeId: string): Observable<number>;
  abstract updateAssetType(assetTypeId: string, assetType: AssetType, values: Value[]): Observable<number>;

  // OTHERS
  abstract getAssignedAttributes(assetTypeClassId: string): Observable<AssignedAttribute[]>;

}
