// import {AssetTypeRepository} from '../../asset-types/asset.type.repository';
// import {AssetTypesClient} from '../../client/asset-type/asset.types.client';
// import {Observable} from 'rxjs';
// import {AssetType} from '../../asset-types/asset.type';
// import {AssetTypes} from '../../asset-types/asset.types';
// import {Instance} from '../../asset-types/instance';
// import {Brand} from '../../brands/brand';
//
// export class AssetTypeRepositoryAdapter extends AssetTypeRepository {
//
//   constructor(private assetTypesClient: AssetTypesClient) {
//     super();
//   }
//
//   findAssetTypes(searchStr: string, pageSize: number): Observable<AssetType[]> {
//     return this.assetTypesClient.findAssetTypes(searchStr, pageSize);
//   }
//
//   getAssetTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetTypes> {
//     return this.assetTypesClient.getAssetTypes(pageNumber, pageSize, sortOrder);
//   }
//
//
//   getAssetType(assetTypeId: string): Observable<AssetType> {
//     return this.assetTypesClient.getAssetTypeState(assetTypeId);
//   }
//
//   addAssetType(assetType: AssetType): Observable<AssetType> {
//     return this.assetTypesClient.addAssetTypeState(assetType);
//   }
//
//   deleteAssetType(assetTypeId: string): Observable<number> {
//     return this.assetTypesClient.deleteAssetType(assetTypeId);
//   }
//
//   updateAssetType(assetTypeId: string, assetType: AssetType): Observable<number> {
//     return this.assetTypesClient.updateAssetType(assetTypeId, assetType);
//   }
//
//   // OTHERS
//   findInstances(searchStr: string, pageSize: number): Observable<Instance[]> {
//     return this.assetTypesClient.findInstances(searchStr, pageSize);
//   }
//
//   findBrands(searchStr: string, pageSize: number): Observable<Brand[]> {
//     return this.assetTypesClient.findBrands(searchStr, pageSize);
//   }
//
// }
