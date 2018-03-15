"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_repository_factory_1 = require("./asset.type.repository.factory");
class AssetOrchestrator {
    constructor() {
        this.assetTypeRepository = asset_type_repository_factory_1.createAssetTypeRepository();
    }
    getAssetTypes(searchStr, pageSize) {
        return this.assetTypeRepository.getAssetTypes(searchStr, pageSize);
    }
}
exports.AssetOrchestrator = AssetOrchestrator;
//# sourceMappingURL=asset.type.orchestrator.js.map