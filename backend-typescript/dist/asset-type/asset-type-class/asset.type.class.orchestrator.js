"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_order_util_1 = require("../../sort.order.util");
const asset_type_class_repository_factory_1 = require("./asset.type.class.repository.factory");
const asset_type_class_response_shaper_1 = require("./asset.type.class.response.shaper");
const result_success_1 = require("../../result.success");
class AssetTypeClassOrchestrator {
    constructor() {
        this.assetTypeClassRepository = asset_type_class_repository_factory_1.createAssetTypeClassesRepositoryFactory();
    }
    getAssetTypeClasses(number, size, field, direction) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.assetTypeClassRepository
            .getAssetTypeClasses(number, size, sort)
            .flatMap(value => {
            return this.assetTypeClassRepository
                .getAssetTypeClassCount()
                .map(count => {
                let shapeAssetTypeClasssResp = asset_type_class_response_shaper_1.shapeAssetTypeClasssResponse("assetTypeClasses", value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "", shapeAssetTypeClasssResp);
            });
        });
    }
    getAssetTypeClass(assetTypeClassId) {
        return this.assetTypeClassRepository.getAssetTypeClass(assetTypeClassId);
    }
    saveAssetTypeClass(assetTypeClass) {
        return this.assetTypeClassRepository.saveAssetTypeClass(assetTypeClass);
    }
    deleteAssetTypeClass(assetTypeClassId) {
        return this.assetTypeClassRepository.deleteAssetTypeClass(assetTypeClassId);
    }
    updateAssetTypeClass(assetTypeClassId, assetTypeClass) {
        return this.assetTypeClassRepository.updateAssetTypeClass(assetTypeClassId, assetTypeClass);
    }
}
exports.AssetTypeClassOrchestrator = AssetTypeClassOrchestrator;
//# sourceMappingURL=asset.type.class.orchestrator.js.map