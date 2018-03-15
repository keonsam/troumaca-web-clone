"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_type_repository_factory_1 = require("./data.type.repository.factory");
class DataTypeOrchestrator {
    constructor() {
        this.dataTypeRepository = data_type_repository_factory_1.createDataTypeRepository();
    }
    getDataTypes() {
        return this.dataTypeRepository.getDataTypes();
    }
}
exports.DataTypeOrchestrator = DataTypeOrchestrator;
//# sourceMappingURL=data.type.orchestrator.js.map