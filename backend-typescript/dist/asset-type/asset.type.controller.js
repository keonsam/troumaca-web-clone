"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_orchestrator_1 = require("./asset.type.orchestrator");
const asset_type_response_shaper_1 = require("./asset.type.response.shaper");
let assetOrchestrator = new asset_type_orchestrator_1.AssetOrchestrator();
exports.getAssets = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    assetOrchestrator.getAssetTypes(searchStr, pageSize)
        .map(value => {
        return asset_type_response_shaper_1.shapeAssetTypesResponse2("assetTypes", value);
    }).subscribe(assetTypes => {
        let body = JSON.stringify(assetTypes);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
//# sourceMappingURL=asset.type.controller.js.map