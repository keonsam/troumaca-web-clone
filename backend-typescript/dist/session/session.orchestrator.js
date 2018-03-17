"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_repository_factory_1 = require("./session.repository.factory");
const session_response_shaper_1 = require("./session.response.shaper");
class SessionOrchestrator {
    constructor() {
        this.sessionRepositoryFactory = session_repository_factory_1.createSessionRepositoryFactory();
    }
    isValidSession(sessionId) {
        return sessionRepository
            .isValidSession(sessionId)
            .map(valid => {
            return session_response_shaper_1.shapeSessionResponse(valid);
        });
    }
    getSimpleSession(sessionId) {
        // Todo: Need to verify.
        return sessionRepository
            .getSessionById(sessionId)
            .map(valid => {
            return session_response_shaper_1.shapeSessionResponse(valid);
        });
    }
}
exports.SessionOrchestrator = SessionOrchestrator;
//# sourceMappingURL=session.orchestrator.js.map