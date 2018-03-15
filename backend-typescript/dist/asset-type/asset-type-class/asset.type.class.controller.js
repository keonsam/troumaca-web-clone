"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_util_1 = require("../../number.util");
const string_util_1 = require("../../string.util");
const asset_type_class_orchestrator_1 = require("./asset.type.class.orchestrator");
let orchestrator = new asset_type_class_orchestrator_1.AssetTypeClassOrchestrator();
// router.get("/", function (req, res, next) {
exports.getAssetTypeClasses = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    orchestrator.getAssetTypeClasses(number, size, field, direction)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.get("/:assetTypeClassId", function (req, res, ndex){
exports.getAssetTypeClass = (req, res) => {
    let assetTypeClassId = req.params.assetTypeClassId;
    orchestrator.getAssetTypeClass(assetTypeClassId)
        .subscribe(assetTypeClass => {
        let body = JSON.stringify(assetTypeClass);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
// router.post("/", function (req, res, ndex) {
exports.saveAssetTypeClass = (req, res) => {
    let assetTypeClass = req.body;
    orchestrator.saveAssetTypeClass(assetTypeClass)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.put("/:assetTypeClassId", function (req, res, next) {
exports.updateAssetTypeClass = (req, res) => {
    let assetTypeClassId = req.params.assetTypeClassId;
    let assetTypeClass = req.body;
    orchestrator.updateAssetTypeClass(assetTypeClassId, assetTypeClass)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.delete("/:assetTypeClassId", function (req, res, next) {
exports.deleteAssetTypeClass = (req, res) => {
    let assetTypeClassId = req.params.assetTypeClassId;
    orchestrator.deleteAssetTypeClass(assetTypeClassId)
        .subscribe(assetTypeClass => {
        res.send(JSON.stringify(assetTypeClass));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
//# sourceMappingURL=asset.type.class.controller.js.map