"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_repository_factory_1 = require("./asset.type.repository.factory");
const asset_type_response_shaper_1 = require("./asset.type.response.shaper");
const result_success_1 = require("../result.success");
const sort_order_util_1 = require("../sort.order.util");
class AssetTypeOrchestrator {
    constructor(options) {
        this.assetTypeRepository = asset_type_repository_factory_1.createAssetTypeRepository(options);
    }
    findAssetTypes(searchStr, pageSize) {
        return this.assetTypeRepository.findAssetTypes(searchStr, pageSize);
    }
    saveAssetType(assetType) {
        return this.assetTypeRepository.saveAssetType(assetType);
    }
    ;
    getAssetTypeCount() {
        return this.assetTypeRepository.getAssetTypeCount();
    }
    getAssetTypes(number, size, field, direction) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.assetTypeRepository
            .getAssetTypes(number, size, sort)
            .flatMap(value => {
            return this.assetTypeRepository
                .getAssetTypeCount()
                .map(count => {
                let shapeAssetTypesResp = asset_type_response_shaper_1.shapeAssetTypesResponse(value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "assetTypes", shapeAssetTypesResp);
            });
        });
    }
    getAssetTypeById(assetTypeId) {
        return this.assetTypeRepository.getAssetTypeById(assetTypeId);
    }
    updateAssetType(assetTypeId, assetType) {
        return this.assetTypeRepository.updateAssetType(assetTypeId, assetType);
    }
    deleteAssetType(assetTypeId) {
        return this.assetTypeRepository.deleteAssetType(assetTypeId);
    }
}
exports.AssetTypeOrchestrator = AssetTypeOrchestrator;
//# sourceMappingURL=asset.type.orchestrator.js.map