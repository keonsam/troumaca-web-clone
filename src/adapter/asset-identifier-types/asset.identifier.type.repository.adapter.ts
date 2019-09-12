// import {AssetIdentifierTypeRepository} from '../../asset-identifier-types/asset.identifier.type.repository';
// import {AssetIdentifierTypeClient} from '../../client/asset-identifier-types/asset.identifier.type.client';
// import {Observable} from 'rxjs';
// import {AssetIdentifierTypes} from '../../asset-identifier-types/asset.identifier.types';
// import {AssetIdentifierType} from '../../asset-identifier-types/asset.identifier.type';
//
// export class AssetIdentifierTypeRepositoryAdapter extends  AssetIdentifierTypeRepository {
//
//   constructor(private assetIdentifierTypeClient: AssetIdentifierTypeClient) {
//     super();
//   }
//
//   findAssetIdentifierTypes(searchStr: string, pageSize: number): Observable<AssetIdentifierType[]> {
//     return this.assetIdentifierTypeClient.findAssetIdentifierTypes(searchStr, pageSize);
//   }
//
//   getAssetIdentifierTypes(pageNumber: number, pageSize: number, sortOrder: string): Observable<AssetIdentifierTypes> {
//     return this.assetIdentifierTypeClient.getAssetIdentifierTypes(pageNumber, pageSize, sortOrder);
//   }
//
//   getAssetIdentifierType(assetIdentifierTypeId: string): Observable<AssetIdentifierType> {
//     return this.assetIdentifierTypeClient.getAssetIdentifierType(assetIdentifierTypeId);
//   }
//
//   addAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<AssetIdentifierType> {
//     return this.assetIdentifierTypeClient.addAssetIdentifierType(assetIdentifierType);
//   }
//
//   updateAssetIdentifierType(assetIdentifierType: AssetIdentifierType): Observable<number> {
//     return this.assetIdentifierTypeClient.updateAssetIdentifierType(assetIdentifierType);
//   }
//
//   deleteAssetIdentifierType(assetIdentifierTypeId: string): Observable<number> {
//     return this.assetIdentifierTypeClient.deleteAssetIdentifierType(assetIdentifierTypeId);
//   }
//
// }
