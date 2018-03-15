"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_util_1 = require("../../number.util");
const string_util_1 = require("../../string.util");
const asset_orchestrator_1 = require("./asset.orchestrator");
let assetOrchestrator = new asset_orchestrator_1.AssetOrchestrator();
exports.getAssets = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    assetOrchestrator.getAssets(number, size, field, direction)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    });
};
exports.saveAsset = (req, res) => {
    assetOrchestrator.saveAsset(req.body)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.getAssetCount = (req, res) => {
    assetOrchestrator.getAssetCount()
        .subscribe(assetCount => {
        res.send(JSON.stringify(assetCount));
    });
};
exports.getAssetById = (req, res) => {
    assetOrchestrator.getAssetById(req.body.assetId)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.updateAsset = (req, res) => {
    assetOrchestrator.updateAsset(req.body.assetId, req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
exports.deleteAsset = (req, res) => {
    assetOrchestrator.deleteAsset(req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
//# sourceMappingURL=asset.controller.js.map