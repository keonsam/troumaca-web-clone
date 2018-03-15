"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_util_1 = require("../number.util");
const string_util_1 = require("../string.util");
const orchestrator_1 = require("./orchestrator");
let assetOrchestrator = new orchestrator_1.AssetOrchestrator();
exports.getAssets = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    assetOrchestrator.getAssets(number, size, field, direction)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
//# sourceMappingURL=asset.controller.js.map