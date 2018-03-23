import {Request, Response} from "express";
import {AccountOrchestrator} from "./account.orchestrator";
import {User} from "./user/user";
import {Organization} from "./organization/organization";

let accountOrchestrator:AccountOrchestrator = new AccountOrchestrator();

export  let saveAccount = (req: Request, res: Response) => {
  /*let sessionId:string = req.header("sessionId");
  let credentialId:string = req.header("credentialId"); */
  let sessionId:string = "59f045ad-c55c-4365-bc5e-dd2059f17b39";
  let credentialId:string = "4922575a-fd86-4039-a585-7c7089483492";
  let accountType = req.body.accountType;
  let user:User = req.body.user;
  let organization:Organization = req.body.organization;
  accountOrchestrator.saveAccount(accountType,user, organization, credentialId, sessionId)
    .subscribe(account => {
      res.send(JSON.stringify(account));
    });
};
