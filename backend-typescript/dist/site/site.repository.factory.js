"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const Rx = __importStar(require("rxjs"));
const repository_kind_1 = require("../repository.kind");
const db_1 = require("../db");
class SiteDBRepository {
    findSite(searchStr, pageSize) {
        let searchStrLocal = new RegExp(searchStr);
        return Rx.Observable.create(function (observer) {
            db_1.sites.find({ name: { $regex: searchStrLocal } }).limit(pageSize).exec(function (err, doc) {
                if (!err) {
                    observer.next(doc);
                }
                else {
                    observer.error(err);
                }
                observer.complete();
            });
        });
    }
}
class SiteRestRepository {
    findSite(searchStr, pageSize) {
        return undefined;
    }
}
function createSiteRepository(kind) {
    switch (kind) {
        case repository_kind_1.RepositoryKind.Nedb:
            return new SiteDBRepository();
        case repository_kind_1.RepositoryKind.Rest:
            return new SiteRestRepository();
        default:
            return new SiteDBRepository();
    }
}
exports.createSiteRepository = createSiteRepository;
//# sourceMappingURL=site.repository.factory.js.map