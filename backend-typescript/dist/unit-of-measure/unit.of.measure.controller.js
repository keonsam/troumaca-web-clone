"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unit_of_measure_orchestrator_1 = require("./unit.of.measure.orchestrator");
let unitOfMeasureOrchestrator = new unit_of_measure_orchestrator_1.UnitOfMeasureOrchestrator();
exports.findUnitOfMeasure = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    unitOfMeasureOrchestrator.findUnitOfMeasure(searchStr, pageSize)
        .map(value => {
        return value; // upgraded to new method
    }).subscribe(unitOfMeasures => {
        let body = JSON.stringify(unitOfMeasures);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
//# sourceMappingURL=unit.of.measure.controller.js.map