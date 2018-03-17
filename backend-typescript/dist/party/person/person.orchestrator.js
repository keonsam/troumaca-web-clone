"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_repository_factory_1 = require("./person.repository.factory");
class PersonOrchestrator {
    constructor() {
        this.personRepository = person_repository_factory_1.createPersonRepository();
    }
    findPerson(searchStr, pageSize) {
        return this.personRepository.findPerson(searchStr, pageSize);
    }
}
exports.PersonOrchestrator = PersonOrchestrator;
//# sourceMappingURL=person.orchestrator.js.map