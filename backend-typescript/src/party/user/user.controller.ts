import {Request, Response} from "express";
import {UserOrchestrator} from "./user.orchestrator";
import {getNumericValueOrDefault} from "../number.util";
import {getStringValueOrDefault} from "../string.util";

let userOrchestrator:UserOrchestrator = new UserOrchestrator();

export  let getUsers = (req: Request, res: Response) => {

  let number = getNumericValueOrDefault(req.query.pageNumber, 1);
  let size = getNumericValueOrDefault(req.query.pageSize, 10);
  let field = getStringValueOrDefault(req.query.sortField, "");
  let direction = getStringValueOrDefault(req.query.sortOrder, "");

  userOrchestrator
    .getUsers(number, size, field, direction)
    .subscribe(users => {
      res.send(JSON.stringify(users));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export  let getUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  userOrchestrator
    .getUser(partyId)
    .subscribe(user => {
      let body = JSON.stringify(user);
      res.send(body);
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export  let saveUser = (req: Request, res: Response) => {
  let user = req.body;
  userOrchestrator
    .saveUser(user)
    .subscribe(user => {
      res.send(JSON.stringify(user));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let deleteUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;

  userOrchestrator
    .deleteUser(partyId)
    .subscribe(numRemoved => {
      res.send(JSON.stringify(numRemoved));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

export let updateUser = (req: Request, res: Response) => {
  let partyId = req.params.partyId;
  let user = req.body;
  userOrchestrator
    .updateUser(partyId, user)
    .subscribe(numUpdated => {
      res.send(JSON.stringify(numUpdated));
    }, error => {
      res.status(400);
      res.send(error);
      console.log(error);
    });
};

