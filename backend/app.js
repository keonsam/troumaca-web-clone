var factoryOptions = {
  "useDatabase": true
};

require('./features/asset/repository.factory')(factoryOptions);
require('./features/asset-type-classes/repository.factory')(factoryOptions);

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');

// need to transition to the new resources approach
let assets = require('./routes/assets');
let asset = require('./routes/asset');
// let lots = require('./routes/lots');
let assetTypes = require('./routes/asset-types');
let unitOfMeasures = require('./routes/unit-of-measures');
let persons = require('./routes/parties/persons/persons');
let unionOfPhysicalSites = require('./routes/sites/physical-sites/union-of-physical-sites');
// let emailSites = require("./routes/sites/virtual-sites/e-mail-sites");

let assetResource = require('./features/asset/resources');
let assetTypeClassesResource = require('./features/asset-type-classes/resources');
let siteResource = require('./features/site/resources');
let attributesResource = require('./features/attributes/resources');
let assetsResource = require('./features/asset-types/resources');
let shipmentResource = require('./features/shipment/resources');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

//app.use('/assets', assets);
app.use('/asset', asset);
// app.use('/lots', lots);
//app.use('/asset-types', assetTypes);
app.use('/unit-of-measures', unitOfMeasures);

app.use('/sites/physical-sites', unionOfPhysicalSites);
// app.use('/sites/virtual-sites', emailSites);
// app.use('/sites/virtual-sites/phones', telephonicSites);

app.use('/parties/persons', persons);
app.use('/assets', assetResource);
app.use('/asset-type-classes', assetTypeClassesResource);
app.use('/sites', siteResource);
app.use('/attributes', attributesResource);
app.use('/asset-types', assetsResource);
app.use('/shipments', shipmentResource);
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
