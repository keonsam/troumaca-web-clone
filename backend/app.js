let factoryOptions = {
  "useDatabase": true
};

require('./feature/asset/repository.factory')(factoryOptions);
require('./feature/asset-type-class/repository.factory')(factoryOptions);

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var accessMiddleware = require('./feature/access-middleware');

// need to transition to the new resources approach
// let assets = require('./routes/assets');
let asset = require('./routes/asset');
// let lots = require('./routes/lots');
// let assetTypes = require('./routes/asset-types');
let unitOfMeasures = require('./routes/unit-of-measures');
let persons = require('./routes/parties/persons/persons');
let unionOfPhysicalSites = require('./routes/sites/physical-sites/union-of-physical-sites');
// let emailSites = require("./routes/sites/virtual-sites/e-mail-sites");

let assetResource = require('./feature/asset/resources');
let assetTypeClassesResource = require('./feature/asset-type-class/resources');
let siteResource = require('./feature/site/resources');
let attributesResource = require('./feature/attributes/resources');
let assetsResource = require('./feature/asset-types/resources');
let shipmentResource = require('./feature/shipment/resources');
let credentialResource = require('./feature/credential/credential.resources');
let partyResource = require('./feature/party/resources');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
// need cookieParser middleware before we can do anything with cookies
app.use(cookieParser());
app.use(accessMiddleware());



app.use('/asset', asset);
app.use('/unit-of-measures', unitOfMeasures);
app.use('/sites/physical-sites', unionOfPhysicalSites);
app.use('/assets', assetResource);
app.use('/asset-type-classes', assetTypeClassesResource);
app.use('/sites', siteResource);
app.use('/attributes', attributesResource);
app.use('/asset-types', assetsResource);
app.use('/shipments', shipmentResource);
app.use('/credentials', credentialResource);
app.use('/parties', partyResource);
// app.set('view engine', 'ejs');

// Needs to introduce a middle where that will check active session
// and and add the session information to the request.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

module.exports = app;
