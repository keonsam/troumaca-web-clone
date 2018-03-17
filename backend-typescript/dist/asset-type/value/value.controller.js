"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_orchestrator_1 = require("./value.orchestrator");
const value_response_shaper_1 = require("./value.response.shaper");
const number_util_1 = require("../../number.util");
const string_util_1 = require("../../string.util");
let valueOrchestrator = new value_orchestrator_1.ValueOrchestrator();
exports.getValues = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    valueOrchestrator.getValues(number, size, field, direction)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    });
};
exports.saveValue = (req, res) => {
    valueOrchestrator.saveValue(req.body)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.getValueCount = (req, res) => {
    valueOrchestrator.getValueCount()
        .subscribe(assetCount => {
        res.send(JSON.stringify(assetCount));
    });
};
exports.getValueById = (req, res) => {
    valueOrchestrator.getValueById(req.body.assetId)
        .subscribe(assets => {
        res.send(JSON.stringify(assets));
    });
};
exports.findValues = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    valueOrchestrator.findValues(searchStr, pageSize)
        .map(value => {
        return value_response_shaper_1.shapeValuesResponse2("values", value);
    }).subscribe(values => {
        let body = JSON.stringify(values);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
exports.updateValue = (req, res) => {
    valueOrchestrator.updateValue(req.body.assetId, req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
exports.deleteValue = (req, res) => {
    valueOrchestrator.deleteValue(req.body)
        .subscribe(affected => {
        res.send(JSON.stringify(affected));
    });
};
//# sourceMappingURL=value.controller.js.map