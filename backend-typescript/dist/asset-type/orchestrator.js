"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_repository_factory_1 = require("./asset.type.repository.factory");
const response_shaper_1 = require("./response.shaper");
let assetTypeRepository = asset_type_repository_factory_1.createAssetTypeRepository();
class AssetOrchestrator {
    constructor() {
        this.that = this;
    }
    saveAsset(asset) {
        return assetTypeRepository.saveAsset(asset);
    }
    ;
    getAssets(number, size, field, direction) {
        let sort = getSortOrderOrDefault(field, direction);
        return assetTypeRepository
            .getAssets(number, size, sort)
            .flatMap(value => {
            return assetRepository
                .getAssetCount()
                .map(count => {
                return response_shaper_1.shapeAssetsResponse(value, number, size, value.length, count, sort);
            });
        });
    }
    ;
    getAssetKinds() {
        return assetTypeRepository
            .getAssetKinds()
            .map(value => {
            return response_shaper_1.shapeAssetsResponse2("assetKinds", value);
        });
    }
    getAssetTypes(searchStr, pageSize) {
        return assetTypeRepository
            .getAssetTypes(searchStr, pageSize)
            .map(value => {
            return response_shaper_1.shapeAssetsResponse2("assetTypes", value);
        });
    }
    getUnionOfPhysicalSites(searchStr, pageSize) {
        return assetTypeRepository
            .getUnionOfPhysicalSites(searchStr, pageSize)
            .map(value => {
            return response_shaper_1.shapeAssetsResponse2("unionOfPhysicalSites", value);
        });
    }
    getUnitOfMeasures(searchStr, pageSize) {
        return assetTypeRepository
            .getUnitOfMeasures(searchStr, pageSize)
            .map(value => {
            return response_shaper_1.shapeAssetsResponse2("unitOfMeasures", value);
        });
    }
    getPersons(searchStr, pageSize) {
        return assetTypeRepository
            .getPersons(searchStr, pageSize)
            .map(value => {
            return response_shaper_1.shapeAssetsResponse2("persons", value);
        });
    }
    getAssetById(assetId) {
        return assetTypeRepository.getAssetById(assetId);
    }
    updateAsset(assetId, asset) {
        return assetTypeRepository.updateAsset(assetId, asset);
    }
    deleteAsset(assetId) {
        return assetTypeRepository.deleteAsset(assetId);
    }
    ;
}
exports.AssetOrchestrator = AssetOrchestrator;
function getSortOrderOrDefault(field, direction) {
    let sort = {};
    if (field && direction) {
        sort[field] = direction;
        return sort;
    }
    else {
        return sort;
    }
}
//# sourceMappingURL=orchestrator.js.map