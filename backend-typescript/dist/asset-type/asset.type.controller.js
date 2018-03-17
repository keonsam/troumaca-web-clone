"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_orchestrator_1 = require("./asset.type.orchestrator");
const asset_type_response_shaper_1 = require("./asset.type.response.shaper");
const number_util_1 = require("../number.util");
const string_util_1 = require("../string.util");
let assetTypeOrchestrator = new asset_type_orchestrator_1.AssetTypeOrchestrator();
exports.getAssetTypes = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    assetTypeOrchestrator.getAssetTypes(number, size, field, direction)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    });
};
exports.saveAssetType = (req, res) => {
    assetTypeOrchestrator.saveAssetType(req.body)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.getAssetTypeCount = (req, res) => {
    assetTypeOrchestrator.getAssetTypeCount()
        .subscribe(assetCount => {
        res.send(JSON.stringify(assetCount));
    });
};
exports.getAssetTypeById = (req, res) => {
    assetTypeOrchestrator.getAssetTypeById(req.body.assetId)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.findAssetTypes = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    assetTypeOrchestrator.findAssetTypes(searchStr, pageSize)
        .map(value => {
        return asset_type_response_shaper_1.shapeAssetTypesResponse2("assetTypes", value);
    }).subscribe(assetTypes => {
        let body = JSON.stringify(assetTypes);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
exports.updateAssetType = (req, res) => {
    assetTypeOrchestrator.updateAssetType(req.body.assetId, req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
exports.deleteAssetType = (req, res) => {
    assetTypeOrchestrator.deleteAssetType(req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
//# sourceMappingURL=asset.type.controller.js.map