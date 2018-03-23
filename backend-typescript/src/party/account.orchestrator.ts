import Rx from "rxjs";
import {Observable} from "rxjs/Observable";
import {createUserRepository} from "./user/user.repository.factory";
import {createOrganizationRepository} from "./organization/organization.repository.factory";
import {createSessionRepositoryFactory} from "../session/session.repository.factory";
import {createCredentialRepositoryFactory} from "../authentication/credential/credential.repository.factory";
import {UserRepository} from "./user/user.repository";
import {OrganizationRepository} from "./organization/organization.repository";
import {User} from "./user/user";
import {Credential} from "../authentication/credential/credential";
import {SessionRepository} from "../session/session.repository";
import {Organization} from "./organization/organization";
import {AccountResponse} from "./account.response";
import {CredentialRepository} from "../authentication/credential/credential.repository";

export class AccountOrchestrator {

  private userRepository:UserRepository;
  private organizationRepository:OrganizationRepository;
  private sessionRepository:SessionRepository;
  private credentialRepository:CredentialRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  saveAccount (accountType:string , user:User, organization:Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    // accountType not used in this current set up. you may find it of use in the future. I left it as is.
    if (this.isValidAccount(user, organization)) {
      return Rx.Observable.of(new AccountResponse(false));
    } else {
      return this.createAccount(user, organization, credentialId, sessionId);
    }
  };

  private createAccount(user: User, organization: Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    // Todo: Change to concurrent update with forkJoin
    return this.credentialRepository.getCredentialByCredentialId(credentialId)
      .switchMap(credential => {
        if (!credential) {
          return Observable.of(new AccountResponse(false));
        }
        user.username = credential.username;
        return this.userRepository.saveUser(user)
          .switchMap(newUser => {
            if(!newUser) {
              return Observable.of(new AccountResponse(false));
            }
            if (organization) {
              organization.partyId = user.partyId;
              return this.organizationRepository.saveOrganization(organization)
                .switchMap(newOrganization => {
                  if (!newOrganization) {
                    return Observable.of(new AccountResponse(false));
                  }
                  return this.updateAccounts(credentialId, newUser, sessionId, organization);
                });
            }
            return this.updateAccounts(credentialId, newUser, sessionId, organization);
          });
      });
  }


  private updateAccounts(credentialId:string, newUser: User, sessionId: string, organization: Organization){
    return this.credentialRepository.updateCredentialPartyId(credentialId, newUser.partyId)
      .switchMap(numReplaced => {
        if(!numReplaced){
          return Observable.of(new AccountResponse(false));
        }else {
          return this.sessionRepository.updateSessionPartyId(sessionId, newUser.partyId)
            .map(numReplaced => {
              if(!numReplaced) {
                return new AccountResponse(false);
              }
              return new AccountResponse(true, newUser, organization);
            });
        }
      });
   }

  private isValidAccount(user: User, organization: Organization) {
    // TODO: implement
    return false;
  }

}
