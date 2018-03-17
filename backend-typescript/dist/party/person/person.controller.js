"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_orchestrator_1 = require("./person.orchestrator");
const person_response_shaper_1 = require("./person.response.shaper");
let personOrchestrator = new person_orchestrator_1.PersonOrchestrator();
exports.findPerson = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    personOrchestrator.findPerson(searchStr, pageSize)
        .map(value => {
        return person_response_shaper_1.shapePersonResponse2("person", value); //TODO: change to new method
    }).subscribe(persons => {
        let body = JSON.stringify(persons);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
//# sourceMappingURL=person.controller.js.map