// import {createAssetTypeRepository} from './asset.type.repository.factory';
// import {shapeAssetsResponse, shapeAssetsResponse2} from "./response.shaper";
// import {AssetTypeRestRepository} from "./asset.type.rest.repository";
//
// let assetTypeRepository:AssetTypeRestRepository = createAssetTypeRepository();
//
// export class AssetOrchestrator {
//
//   that = this;
//
//   saveAsset(asset) {
//     return assetTypeRepository.saveAsset(asset);
//   };
//
//   getAssets(number, size, field, direction) {
//     let sort = getSortOrderOrDefault(field, direction);
//     return assetTypeRepository
//     .getAssets(number, size, sort)
//     .flatMap(value => {
//       return assetRepository
//         .getAssetCount()
//         .map(count => {
//           return shapeAssetsResponse(value, number, size, value.length, count, sort);
//         });
//     });
//   };
//
//   getAssetKinds() {
//     return assetTypeRepository
//     .getAssetKinds()
//     .map(value => {
//       return shapeAssetsResponse2("assetKinds", value);
//     });
//   }
//
//   getAssetTypes(searchStr, pageSize) {
//     return assetTypeRepository
//     .getAssetTypes(searchStr, pageSize)
//     .map(value => {
//       return shapeAssetsResponse2("assetTypes", value);
//     });
//   }
//
//   getUnionOfPhysicalSites(searchStr, pageSize) {
//     return assetTypeRepository
//     .getUnionOfPhysicalSites(searchStr, pageSize)
//     .map(value => {
//       return shapeAssetsResponse2("unionOfPhysicalSites", value);
//     });
//   }
//
//   getUnitOfMeasures(searchStr, pageSize) {
//     return assetTypeRepository
//     .getUnitOfMeasures(searchStr, pageSize)
//     .map(value => {
//       return shapeAssetsResponse2("unitOfMeasures", value);
//     });
//   }
//
//   getPersons(searchStr, pageSize) {
//     return assetTypeRepository
//     .getPersons(searchStr, pageSize)
//     .map(value => {
//       return shapeAssetsResponse2("persons", value);
//     });
//   }
//
//   getAssetById(assetId) {
//     return assetTypeRepository.getAssetById(assetId);
//   }
//
//   updateAsset(assetId, asset) {
//     return assetTypeRepository.updateAsset(assetId, asset);
//   }
//
//   deleteAsset(assetId) {
//     return assetTypeRepository.deleteAsset(assetId);
//   };
//
// }
//
// function getSortOrderOrDefault(field, direction) {
//   let sort = {};
//   if (field && direction) {
//     sort[field] = direction;
//     return sort;
//   } else {
//     return sort;
//   }
// }
//# sourceMappingURL=orchestrator.js.map