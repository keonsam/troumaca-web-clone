"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_kind_orchestrator_1 = require("./asset.kind.orchestrator");
const asset_kind_response_shaper_1 = require("./asset.kind.response.shaper");
let assetOrchestrator = new asset_kind_orchestrator_1.AssetOrchestrator();
exports.getAssets = (req, res) => {
    assetOrchestrator.getAssetKinds()
        .subscribe(assetKinds => {
        let body = JSON.stringify(asset_kind_response_shaper_1.shapeAssetKindResponse2("assetKinds", assetKinds));
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
//# sourceMappingURL=asset.kind.controller.js.map