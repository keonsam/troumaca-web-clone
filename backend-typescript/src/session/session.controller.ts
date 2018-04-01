import {Request, Response} from 'express'
import {SessionOrchestrator} from './session.orchestrator'

let sessionOrchestrator:SessionOrchestrator = new SessionOrchestrator();

// router.post("/active", function (req, res, next) {
export let isValidSession = (req: Request, res: Response) => {
  let credential:any = req.body;
  sessionOrchestrator.isValidSession(credential)
    .subscribe(next => {
      res.setHeader('Content-Type', 'application/json');
      res.send(next);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

// router.post("/sessions/current-user-session", function (req, res, next) {
export let getSimpleSession = (req: Request, res: Response) => {
  let credential:any = req.body;
  sessionOrchestrator.getSimpleSession(credential)
    .subscribe(next => {
      res.setHeader('Content-Type', 'application/json');
      res.send(next);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};