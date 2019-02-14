import {Observable} from 'rxjs';
import {AssetIdentifierTypes} from '../../asset-identifier-types/asset.identifier.types';
import {AssetIdentifierType} from '../../asset-identifier-types/asset.identifier.type';

export abstract class AssetIdentifierTypeClient {
  abstract findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]>;
  abstract getAssetIdentifierTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetIdentifierTypes>;
  abstract getAssetIdentifierType(assetIdentifierTypeId: string): Observable<AssetIdentifierType>;
  abstract addAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType>;
  abstract updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<number>;
  abstract deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number>;
}
