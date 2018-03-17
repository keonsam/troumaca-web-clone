"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_repository_factory_1 = require("./value.repository.factory");
const value_response_shaper_1 = require("./value.response.shaper");
const result_success_1 = require("../../result.success");
const sort_order_util_1 = require("../../sort.order.util");
class ValueOrchestrator {
    constructor(options) {
        this.valueRepository = value_repository_factory_1.createValueRepository(options);
    }
    findValues(searchStr, pageSize) {
        return this.valueRepository.findValues(searchStr, pageSize);
    }
    saveValue(value) {
        return this.valueRepository.saveValue(value);
    }
    ;
    getValueCount() {
        return this.valueRepository.getValueCount();
    }
    getValues(number, size, field, direction) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.valueRepository
            .getValues(number, size, sort)
            .flatMap(value => {
            return this.valueRepository
                .getValueCount()
                .map(count => {
                let shapeValuesResp = value_response_shaper_1.shapeValuesResponse(value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "values", shapeValuesResp);
            });
        });
    }
    getValueById(valueId) {
        return this.valueRepository.getValueById(valueId);
    }
    updateValue(valueId, value) {
        return this.valueRepository.updateValue(valueId, value);
    }
    deleteValue(valueId) {
        return this.valueRepository.deleteValue(valueId);
    }
}
exports.ValueOrchestrator = ValueOrchestrator;
//# sourceMappingURL=value.orchestrator.js.map