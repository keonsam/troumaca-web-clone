import assetRepositoryFactory from './repository.factory';
// import assetRepository from assetRepositoryFactory.createAssetRepository();
import responseShaper from "./response.shaper";


export class AssetOrchestrator {

  that = this;

  saveAsset(asset) {
    return assetRepository.saveAsset(asset);
  };

  getAssets(number, size, field, direction) {
    let sort = getSortOrderOrDefault(field, direction);
    return assetRepository
    .getAssets(number, size, sort)
    .flatMap(value => {
      return assetRepository
        .getAssetCount()
        .map(count => {
          return responseShaper.shapeAssetsResponse(value, number, size, value.length, count, sort);
        });
    });
  };

  getAssetKinds() {
    return assetRepository
    .getAssetKinds()
    .map(value => {
      return responseShaper.shapeAssetsResponse2("assetKinds", value);
    });
  }

  getAssetTypes(searchStr, pageSize) {
    return assetRepository
    .getAssetTypes(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("assetTypes", value);
    });
  }

  getUnionOfPhysicalSites(searchStr, pageSize) {
    return assetRepository
    .getUnionOfPhysicalSites(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("unionOfPhysicalSites", value);
    });
  }

  getUnitOfMeasures(searchStr, pageSize) {
    return assetRepository
    .getUnitOfMeasures(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("unitOfMeasures", value);
    });
  }

  getPersons(searchStr, pageSize) {
    return assetRepository
    .getPersons(searchStr, pageSize)
    .map(value => {
      return responseShaper.shapeAssetsResponse2("persons", value);
    });
  }

  getAssetById(assetId) {
    return assetRepository.getAssetById(assetId);
  }

  updateAsset(assetId, asset) {
    return assetRepository.updateAsset(assetId, asset);
  }

  deleteAsset(assetId) {
    return assetRepository.deleteAsset(assetId);
  };

}

function getSortOrderOrDefault(field, direction) {
  let sort = {};
  if (field && direction) {
    sort[field] = direction;
    return sort;
  } else {
    return sort;
  }
}
