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
import {PersonRepository} from "./person/person.repository";
import {createPersonRepository} from "./person/person.repository.factory";

export class AccountOrchestrator {

  private userRepository:UserRepository;
  private personRepository:PersonRepository;
  private organizationRepository:OrganizationRepository;
  private sessionRepository:SessionRepository;
  private credentialRepository:CredentialRepository;

  constructor() {
    this.userRepository = createUserRepository();
    this.personRepository = createPersonRepository();
    this.organizationRepository = createOrganizationRepository();
    this.sessionRepository = createSessionRepositoryFactory();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

  saveAccount (accountType:string , person:Person, organization:Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    if (this.isValidAccount(user, organization)) {
      return Rx.Observable.of(new AccountResponse(false));
    } else {
      return this.createAccount(person, organization, credentialId, sessionId);
    }
  };

  private createAccount(person: Person, organization: Organization, credentialId:string, sessionId:string):Observable<AccountResponse> {
    // Todo: Change to concurrent update with forkJoin

    // Todo: I don't understand
    return this.personRepository.addPerson(person)
      .switchMap((newPerson:Person) => {
        return this.organizationRepository.saveOrganization(organization)
          .switchMap(organization => {
            return this.credentialRepository.updateCredentialPartyId(credentialId, newPerson.partyId)
              .switchMap(credential => {
                return this.sessionRepository.updateSessionPartyId(sessionId, newPerson.partyId)
                  .map(session => {
                    return new AccountResponse(true, session, credential, newPerson, organization);
                });
              });
          });
      });
  }

  private isValidAccount(person: Person, organization: Organization) {
    // TODO: implement
    return false;
  }
}
