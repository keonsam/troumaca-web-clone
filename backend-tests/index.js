'use strict';

var server = require('./server');
var port = process.env.PORT || 3333;

server.listen(port, function () {
  console.log('Server running on port %d', port);
});