import Rx from "rxjs";
import {Observable} from "rxjs/Observable";
import {createUserRepository} from "./user/user.repository.factory";
import {createOrganizationRepository} from "./organization/organization.repository.factory";
import {createSessionRepositoryFactory} from "../session/session.repository.factory";
import {createCredentialRepositoryFactory} from "../authentication/credential/credential.repository.factory";
import {UserRepository} from "./user/user.repository";
import {OrganizationRepository} from "./organization/organization.repository";
import {User} from "./user/user";
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

  saveAccount (accountType:string ,user:User, organization:Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    if (this.isValidAccount(user, organization)) {
      return Rx.Observable.of(new AccountResponse(false));
    } else {
      return this.createAccount(user, organization, credentialId, sessionId);
    }
  };

  private createAccount(user: User, organization: Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    // Todo: Change to concurrent update with forkJoin
    return this.userRepository.saveUser(user)
      .switchMap((user:User) => {
        return this.organizationRepository.saveOrganization(organization)
          .switchMap(organization => {
            return this.credentialRepository.updateCredentialPartyId(credentialId, user.partyId)
              .switchMap(credential => {
                return this.sessionRepository.updateSessionPartyId(sessionId, user.partyId)
                  .map(session => {
                    return new AccountResponse(true, session, credential, user, organization);
                });
              });
          });
      });
  }

  private isValidAccount(user: User, organization: Organization) {
    // TODO: implement
    return false;
  }
}
