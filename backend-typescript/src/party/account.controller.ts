import {Request, Response} from "express";
import {AccountOrchestrator} from "./account.orchestrator";
import {Person} from "./person/person";
import {Organization} from "./organization/organization";

let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  let account = req.body;
  console.log(req.cookies);

  let cookie = req.cookies["sessionId"];
  console.log(cookie);
  //let sessionId:sessionId = req.header("sessionId");
  let sessionId:string = "d845ced1-9990-4692-b2fe-6b62999a669f";
  let credentialId:string = req.header("credentialId");

  let person:Person = null;
  let organization:Organization = null;
  accountOrchestrator.saveAccount(person, organization,  sessionId, credentialId)
    .subscribe(account => {
      res.send(JSON.stringify(account));
    });
};
