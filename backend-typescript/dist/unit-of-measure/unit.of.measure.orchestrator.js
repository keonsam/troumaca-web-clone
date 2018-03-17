"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unit_of_measure_repository_factory_1 = require("./unit.of.measure.repository.factory");
class UnitOfMeasureOrchestrator {
    constructor() {
        this.unitOfMeasureRepository = unit_of_measure_repository_factory_1.createUnitOfMeasureRepository();
    }
    findUnitOfMeasure(searchStr, pageSize) {
        return this.unitOfMeasureRepository.findUnitOfMeasure(searchStr, pageSize);
    }
}
exports.UnitOfMeasureOrchestrator = UnitOfMeasureOrchestrator;
//# sourceMappingURL=unit.of.measure.orchestrator.js.map