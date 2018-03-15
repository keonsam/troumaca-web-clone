"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_util_1 = require("../../number.util");
const string_util_1 = require("../../string.util");
const attribute_orchestrator_1 = require("./attribute.orchestrator");
let orchestrator = new attribute_orchestrator_1.AttributeOrchestrator();
// router.get("/attributes", function (req, res, next) {
exports.getAvailableAttributes = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];
    orchestrator.getAvailableAttributes(number, size, field, direction, assignedArray)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.get("/assigned-attributes", function (req, res, next) {
exports.getAssignedAttributes = (req, res) => {
    let number = number_util_1.getNumericValueOrDefault(req.query.pageNumber, 1);
    let size = number_util_1.getNumericValueOrDefault(req.query.pageSize, 10);
    let field = string_util_1.getStringValueOrDefault(req.query.sortField, "");
    let direction = string_util_1.getStringValueOrDefault(req.query.sortOrder, "");
    let assignedArray = req.query.assignedArray ? req.query.assignedArray.split(",") : [];
    orchestrator.getAssignedAttributes(number, size, field, direction, assignedArray)
        .subscribe(result => {
        res.send(JSON.stringify(result.data));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.get("/attributes/:attributeId", function (req, res, ndex){
exports.getAvailableAttribute = (req, res) => {
    let attributeId = req.params.attributeId;
    orchestrator.getAvailableAttribute(attributeId)
        .subscribe(attribute => {
        let body = JSON.stringify(attribute);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
// router.post("/attributes", function (req, res, ndex) {
exports.saveAvailableAttribute = (req, res) => {
    let availableAttribute = req.body;
    orchestrator.saveAvailableAttribute(availableAttribute)
        .subscribe(availableAttribute => {
        res.send(JSON.stringify(availableAttribute));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.put("/attributes/:attributeId", function (req, res, next) {
exports.updateAvailableAttribute = (req, res) => {
    let attributeId = req.params.attributeId;
    let attribute = req.body;
    orchestrator
        .updateAvailableAttribute(attributeId, attribute)
        .subscribe(numUpdated => {
        res.send(JSON.stringify(numUpdated));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
// router.delete("/attributes/:attributeId", function (req, res, next) {
exports.deleteAvailableAttribute = (req, res) => {
    let attributeId = req.params.attributeId;
    orchestrator
        .deleteAvailableAttribute(attributeId)
        .subscribe(numRemoved => {
        res.send(JSON.stringify(numRemoved));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
//# sourceMappingURL=attribute.controller.js.map