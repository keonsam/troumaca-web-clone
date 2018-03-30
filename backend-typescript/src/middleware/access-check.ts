import {NextFunction, Request, Response} from "express";
import {SessionOrchestrator} from "../session/session.orchestrator";

let checkAccess = () => {

  const sessionOrchestrator = new SessionOrchestrator();

  // GET 'http://www.example.com/admin/new'
  // console.log(req.originalUrl); // '/admin/new'
  // console.log(req.baseUrl); // '/admin'
  // console.log(req.path); // '/new'

  let dev:boolean = true;

  let openPaths:Array<string> = [
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

  function isNotSecureEndPoint(originalPath:string) {
    console.log(originalPath);
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

  // function isMode() {
  //
  // }

  return function(req:Request, res:Response, next:NextFunction) {

    let cookies:any = req.cookies;
    let sessionId:string = cookies["sessionId"];

    // if requesting an open page do nothing
    if (isNotSecureEndPoint(req.originalUrl)) {
      next();
    } else if (sessionId) {
      // sessionOrchestrator
      //   .isValidSession(sessionId)
      //   .map(isValid => {
      //     if (isValid) {
      //       next();
      //     } else {
      //       //res.send(401, "Invalid session...")
      //     }
      //   });
    } else {
      //res.send(401, "Cannot access this resource with a session...")
    }
    next();
  };
};

export default checkAccess;
