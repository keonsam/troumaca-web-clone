"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const site_orchestrator_1 = require("./site.orchestrator");
const site_response_shaper_1 = require("./site.response.shaper");
let siteOrchestrator = new site_orchestrator_1.SiteOrchestrator();
exports.findSite = (req, res) => {
    let searchStr = req.query.q;
    let pageSize = req.query.pageSize;
    siteOrchestrator.findSite(searchStr, pageSize)
        .map(value => {
        return site_response_shaper_1.shapeSiteResponse2("sites", value);
    }).subscribe(sites => {
        let body = JSON.stringify(sites);
        res.send(body);
    }, error => {
        res.send(JSON.stringify(error));
    });
};
//# sourceMappingURL=site.controller.js.map