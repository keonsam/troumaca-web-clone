var factoryOptions = {
  "useDatabase": true
};

require('./features/assets/repository.factory')(factoryOptions);

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cors = require('cors');
let bodyParser = require('body-parser');

let assets = require('./features/assets/assets');
let asset = require('./routes/asset');
let lots = require('./routes/lots');

let assetTypes = require('./routes/asset-types');
let unitOfMeasures = require('./routes/unit-of-measures');
let unionOfPhysicalSites = require('./routes/sites/physical-sites/union-of-physical-sites');
let persons = require('./routes/parties/persons/persons');


let assetResource = require('./features/assets/resources');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());

app.use('/assets', assets);
app.use('/asset', asset);
app.use('/lots', lots);
app.use('/asset-types', assetTypes);
app.use('/unit-of-measures', unitOfMeasures);
app.use('/sites/physical-sites', unionOfPhysicalSites);
app.use('/parties/persons', persons);
app.use('/v2/assets', assetResource);

// app.set('view engine', 'ejs');

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
