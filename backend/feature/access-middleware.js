let sessionOrchestrator = require("./session/session.orchestrator");

module.exports = function() {

  // GET 'http://www.example.com/admin/new'
  // console.log(req.originalUrl); // '/admin/new'
  // console.log(req.baseUrl); // '/admin'
  // console.log(req.path); // '/new'

  let dev = true;

  let openPaths = [
    '/authenticate', '/register'
  ];

  function isNotSecureEndPoint(originalPath) {
    if (dev) {
      return true;
    }
    for (let i = 0; i < openPaths.length; i++) {
      const obj = openPaths[i];
      if (obj === originalPath) {
        return true;
      }
    }
    return false;
  }

  return function(req, res, next) {

    let cookies = req.cookies;
    let sessionId = cookies["sessionId"];

    // if requesting an open page do nothing
    if (isNotSecureEndPoint(req.originalUrl)) {
      next();
    } else if (sessionId) {
      sessionOrchestrator
        .isValidSession(sessionId)
        .map(isValid => {
          if (isValid) {
            next();
          } else {
            res.send(401, "Invalid session...")
          }
        })
    } else {
      res.send(401, "Cannot access this resource with a session...")
    }


    next()
  }
};