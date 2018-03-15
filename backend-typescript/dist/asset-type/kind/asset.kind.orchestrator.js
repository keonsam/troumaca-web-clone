"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_kind_repository_factory_1 = require("./asset.kind.repository.factory");
class AssetOrchestrator {
    constructor() {
        this.assetKindRepository = asset_kind_repository_factory_1.createAssetKindRepository();
    }
    getAssetKinds() {
        return this.assetKindRepository.getAssetKinds();
    }
}
exports.AssetOrchestrator = AssetOrchestrator;
//# sourceMappingURL=asset.kind.orchestrator.js.map