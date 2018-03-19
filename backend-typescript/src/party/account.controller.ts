import {Request, Response} from "express";
import {AccountOrchestrator} from "./account.orchestrator";
import {User} from "./user/user";
import {Organization} from "./organization/organization";

let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {

  let sessionId:string = req.header("sessionId");
  let credentialId:string = req.header("credentialId");
  let accountType = req.body.accountType;
  let user:User = req.body.user;
  let organization:Organization = req.body.organization;
  accountOrchestrator.saveAccount(accountType,user, organization,  sessionId, credentialId)
    .subscribe(account => {
      res.send(JSON.stringify(account));
    });
};
