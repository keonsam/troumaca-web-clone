"use strict";
// import sessionOrchestrator = require("./session/session.orchestrator");
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccess = () => {
    // GET 'http://www.example.com/admin/new'
    // console.log(req.originalUrl); // '/admin/new'
    // console.log(req.baseUrl); // '/admin'
    // console.log(req.path); // '/new'
    let dev = true;
    let openPaths = [
        '/authenticate', '/register'
    ];
    // dev mode > no session id > view open page
    // dev mode > no session id > view close page
    // dev mode > session id > view open page
    // dev mode > session id > view close page
    // production mode > no session id > view open page
    // production mode > no session id > view close page
    // production mode > session id > view open page
    // production mode > session id > view close page
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
    function isMode() {
    }
    return function (req, res, next) {
        let cookies = req.cookies;
        let sessionId = cookies["sessionId"];
        // if requesting an open page do nothing
        if (isNotSecureEndPoint(req.originalUrl)) {
            next();
        }
        else if (sessionId) {
            sessionOrchestrator
                .isValidSession(sessionId)
                .map(isValid => {
                if (isValid) {
                    next();
                }
                else {
                    res.send(401, "Invalid session...");
                }
            });
        }
        else {
            res.send(401, "Cannot access this resource with a session...");
        }
        next();
    };
};
//# sourceMappingURL=access-check.js.map