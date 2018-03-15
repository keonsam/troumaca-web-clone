"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
let factoryOptions = {
    "useDatabase": true
};
// require('./feature/asset/repository.factory')(factoryOptions);
// require('./feature/asset-type-class/repository.factory')(factoryOptions);
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const assetTypeController = __importStar(require("./asset-type/asset.kind.controller"));
// let accessMiddleware = require('./feature/access-middleware');
// need to transition to the new resources approach
// let assets = require('./routes/assets');
// let asset = require('./routes/asset');
// let lots = require('./routes/lots');
// let assetTypes = require('./routes/asset-types');
// let unitOfMeasures = require('./routes/unit-of-measures');
// let persons = require('./routes/parties/persons/persons');
// let unionOfPhysicalSites = require('./routes/sites/physical-sites/union-of-physical-sites');
// let emailSites = require("./routes/sites/virtual-sites/e-mail-sites");
// let assetResource = require('./feature/asset/resources');
// let assetTypeClassesResource = require('./feature/asset-type-class/resources');
// let siteResource = require('./feature/site/resources');
// let attributesResource = require('./feature/attribute/resources');
// let assetsResource = require('./feature/asset-type/resources');
// let shipmentResource = require('./feature/shipment/resources');
// let credentialResource = require('./feature/credential/credential.resources');
// let partyResource = require('./feature/party/resources');
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'dist')));
app.use(cors_1.default());
// need cookieParser middleware before we can do anything with cookies
// app.use(accessMiddleware());
// app.use('/asset', asset);
// app.use('/unit-of-measures', unitOfMeasures);
// app.use('/sites/physical-sites', unionOfPhysicalSites);
app.use('/assets', assetTypeController.getAssets);
// app.use('/asset-type-classes', assetTypeClassesResource);
// app.use('/sites', siteResource);
// app.use('/attributes', attributesResource);
// app.use('/asset-types', assetsResource);
// app.use('/shipments', shipmentResource);
// app.use('/credentials', credentialResource);
// app.use('/parties', partyResource);
// Needs to introduce a middle where that will check active session
// and and add the session information to the request.
// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// error handler
// app.use(function(err, req, res, next) {
// set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};
// render the error page
// res.status(err.status || 500);
// res.setHeader('Content-Type', 'application/json');
// res.send('{"message":"Express REST API error"}');
// res.render('error');
// });
exports.default = app;
//# sourceMappingURL=app.js.map