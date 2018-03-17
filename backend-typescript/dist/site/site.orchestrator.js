"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const site_repository_factory_1 = require("./site.repository.factory");
class SiteOrchestrator {
    constructor() {
        this.siteRepository = site_repository_factory_1.createSiteRepository();
    }
    findSite(searchStr, pageSize) {
        return this.siteRepository.findSite(searchStr, pageSize);
    }
}
exports.SiteOrchestrator = SiteOrchestrator;
//# sourceMappingURL=site.orchestrator.js.map