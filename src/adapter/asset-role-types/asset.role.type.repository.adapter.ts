// import {AssetRoleTypeRepository} from '../../asset-role-types/asset.role.type.repository';
// import {AssetRoleTypeClient} from '../../client/asset-role-types/asset.role.type.client';
// import {Observable} from 'rxjs';
// import {AssetRoleTypes} from '../../asset-role-types/asset.role.types';
// import {AssetRoleType} from '../../asset-role-types/asset.role.type';
//
// export class AssetRoleTypeRepositoryAdapter extends  AssetRoleTypeRepository {
//
//   constructor(private assetRoleTypeClient: AssetRoleTypeClient) {
//     super();
//   }
//
//   findAssetRoleTypes(searchStr: string, pageSize: number): Observable<AssetRoleType[]> {
//     return this.assetRoleTypeClient.findAssetRoleTypes(searchStr, pageSize);
//   }
//
//   getAssetRoleTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetRoleTypes> {
//     return this.assetRoleTypeClient.getAssetRoleTypes(pageNumber, pageSize, sortOrder);
//   }
//
//   getAssetRoleType(assetRoleTypeId: string): Observable<AssetRoleType> {
//     return this.assetRoleTypeClient.getAssetRoleType(assetRoleTypeId);
//   }
//
//   addAssetRoleType(assetRoleType: AssetRoleType): Observable<AssetRoleType> {
//     return this.assetRoleTypeClient.addAssetRoleType(assetRoleType);
//   }
//
//   updateAssetRoleType(assetRoleType: AssetRoleType): Observable<number> {
//     return this.assetRoleTypeClient.updateAssetRoleType(assetRoleType);
//   }
//
//   deleteAssetRoleType(assetRoleTypeId: string): Observable<number> {
//     return this.assetRoleTypeClient.deleteAssetRoleType(assetRoleTypeId);
//   }
//
// }
