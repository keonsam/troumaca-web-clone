// import {Observable} from 'rxjs';
// import {AssetType} from './asset.type';
// import {AssetTypes} from './asset.types';
// import {Instance} from './instance';
// import {Brand} from '../brands/brand';
//
// export abstract class AssetTypeRepository {
//   abstract findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]>;
//   abstract getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes>;
//   abstract getAssetType(assetTypeId: string): Observable<AssetType>;
//   abstract addAssetType(assetType: AssetType): Observable<AssetType>;
//   abstract deleteAssetType(assetTypeId: string): Observable<number>;
//   abstract updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number>;
//
//   // OTHERS
//   abstract findInstances(searchStr: string, pageSize: number): Observable<Instance[]>;
//   abstract findBrands(searchStr: string, pageSize: number): Observable<Brand[]>;
// }
