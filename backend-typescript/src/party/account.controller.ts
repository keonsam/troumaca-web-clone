import {Request, Response} from "express";
import {AccountOrchestrator} from "./account.orchestrator";
import {User} from "./user/user";
import {Organization} from "./organization/organization";

let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  let sessionId:string = req.header("sessionId");
  let credentialId:string = req.header("credentialId");
  console.log(req.header);
  console.log(req);
  console.log(req.cookies);
  /*let sessionId:string = "cdfd8c5e-3e5b-418a-b689-d9d680d580f6";
  let credentialId:string = "6d02c3f8-b033-4a40-8ddc-042c2e99c253";*/
  let accountType = req.body.accountType;
  let user:User = req.body.user;
  let organization:Organization = req.body.organization;
  accountOrchestrator.saveAccount(accountType,user, organization, credentialId, sessionId)
    .subscribe(account => {
      res.send(JSON.stringify(account));
    });
};
