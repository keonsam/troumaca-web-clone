import {generateUUID} from "../../uuid.generator";
import {credentialConfirmations, credentials} from "../../db";
import {Observable} from "rxjs/Observable";
import {CredentialConfirmation} from "./credential.confirmation";

export interface ConfirmationRepository {

  addCredentialConfirmation(credentialConfirmation):Observable<CredentialConfirmation>;

  getCredentialConfirmationByCode(credentialConfirmationId, confirmationCode):Observable<CredentialConfirmation>;

  getCredentialConfirmationById(credentialConfirmationId):Observable<CredentialConfirmation>;

  updateCredentialConfirmation(credentialConfirmation):Observable<number>

  getCredentialConfirmationByCredentialId(credentialId):Observable<CredentialConfirmation>;

}
