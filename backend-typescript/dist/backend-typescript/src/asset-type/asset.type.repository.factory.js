"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_type_db_repository_1 = require("./asset.type.db.repository");
const asset_type_rest_repository_1 = require("./asset.type.rest.repository");
var useDatabase = false;
function createAssetTypeRepository(options) {
    if (options) {
        useDatabase = options.useDatabase;
    }
    if (useDatabase) {
        return new asset_type_db_repository_1.AssetTypeDbRepository();
    }
    else {
        return new asset_type_rest_repository_1.AssetTypeRestRepository();
    }
}
exports.createAssetTypeRepository = createAssetTypeRepository;
//# sourceMappingURL=asset.type.repository.factory.js.map