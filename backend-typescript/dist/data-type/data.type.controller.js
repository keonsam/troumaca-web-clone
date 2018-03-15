"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_type_orchestrator_1 = require("./data.type.orchestrator");
let dataTypeOrchestrator = new data_type_orchestrator_1.DataTypeOrchestrator();
exports.getDataTypes = (req, res) => {
    dataTypeOrchestrator.getDataTypes()
        .subscribe(dataTypes => {
        res.send(JSON.stringify(dataTypes));
    }, error => {
        res.status(400);
        res.send(error);
        console.log(error);
    });
};
//# sourceMappingURL=data.type.controller.js.map