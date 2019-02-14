import {Observable} from 'rxjs';
import {AssetRoleTypes} from '../../asset-role-types/asset.role.types';
import {AssetRoleType} from '../../asset-role-types/asset.role.type';

export abstract class AssetRoleTypeClient {
  abstract findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]>;
  abstract getAssetRoleTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetRoleTypes>;
  abstract getAssetRoleType(assetRoleTypeId: string): Observable<AssetRoleType>;
  abstract addAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType>;
  abstract updateAssetRoleType(assetRoleType: AssetRoleType): Observable<number>;
  abstract deleteAssetRoleType(assetRoleTypeId: string): Observable<number>;
}
