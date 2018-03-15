"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sort_order_util_1 = require("../../sort.order.util");
const attribute_repository_factory_1 = require("./attribute.repository.factory");
const attribute_response_shaper_1 = require("./attribute.response.shaper");
const result_success_1 = require("../../result.success");
class AttributeOrchestrator {
    constructor() {
        this.assetTypeClassRepository = attribute_repository_factory_1.createAttributeRepositoryFactory();
    }
    getAvailableAttributes(number, size, field, direction, availableAttributes) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.assetTypeClassRepository
            .getAvailableAttributes(number, size, sort, availableAttributes)
            .flatMap(value => {
            return this.assetTypeClassRepository
                .getAvailableAttributeCount()
                .map(count => {
                let shapeAttrResp = attribute_response_shaper_1.shapeAttributeResponse("attributes", value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "", shapeAttrResp);
            });
        });
    }
    getAssignedAttributes(number, size, field, direction, assignedAttributes) {
        let sort = sort_order_util_1.getSortOrderOrDefault(field, direction);
        return this.assetTypeClassRepository
            .getAssignedAttributes(number, size, sort, assignedAttributes)
            .flatMap(value => {
            return this.assetTypeClassRepository
                .getAvailableAttributeCount()
                .map(count => {
                let shapeAttrResp = attribute_response_shaper_1.shapeAttributeResponse("attributes", value, number, size, value.length, count, sort);
                return new result_success_1.Result(false, "", shapeAttrResp);
            });
        });
    }
    getAvailableAttribute(attributeId) {
        return this.assetTypeClassRepository.getAvailableAttribute(attributeId);
    }
    saveAvailableAttribute(availableAttribute) {
        return this.assetTypeClassRepository.saveAvailableAttribute(availableAttribute);
    }
    deleteAvailableAttribute(attributeId) {
        return this.assetTypeClassRepository.deleteAvailableAttribute(attributeId);
    }
    updateAvailableAttribute(attributeId, attribute) {
        return this.assetTypeClassRepository.updateAvailableAttribute(attributeId, attribute);
    }
}
exports.AttributeOrchestrator = AttributeOrchestrator;
//# sourceMappingURL=attribute.orchestrator.js.map