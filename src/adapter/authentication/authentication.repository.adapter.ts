import {Observable} from "rxjs/Observable";
import {Session} from "../../authentication/session";
import "rxjs/add/operator/map";
import {mapObjectProps} from "../../mapper/object.property.mapper";
import {AuthenticationClient} from "../../client/credential/authentication.client";
import {AuthenticationRepository} from "../../authentication/authentication.repository";
import {Credential} from "../../authentication/credential";
import {CredentialState} from "../../client/credential/credential.state";
import {SessionState} from "../../client/credential/session.state";

export class AuthenticationRepositoryAdapter extends AuthenticationRepository {

  constructor(private authenticationClient: AuthenticationClient) {
    super();
  }

  authenticate(credential: Credential): Observable<Session> {
    return this.authenticationClient
      .authenticate(mapObjectProps(credential, new SessionState()))
      .map(sessionState => {
        return mapObjectProps(sessionState, new Session());
      });
  }

  forgotPassword(username: string): Observable<boolean> {
    //return undefined;
    throw new Error("Not Implemented.")
  }

  isValidPassword(password: string): Observable<boolean> {
    return this.authenticationClient.isValidPassword(password);
  }

  isValidUsername(username: string): Observable<boolean> {
    return this.authenticationClient.isValidUsername(username);
  }

  addCredential(credential:Credential):Observable<Credential> {
    return this.authenticationClient
    .addCredential(mapObjectProps(credential, new CredentialState()))
    .map(credentialState => {
      return mapObjectProps(credentialState, new Credential())
    });
  }

}