import {Observable} from 'rxjs';
import {UserState} from './user.state';
import {CredentialState} from './credential.state';
import {OrganizationState} from './organization.state';
import {AccountResponse} from '../../parties/account.response';
import {PartyAccessRoleState} from './party.access.role.state';
import {PhotoState} from './photo.state';

export abstract class PersonClient {

  public abstract logOutUser(): Observable<boolean>;
  public abstract getPartyId(): Observable<string>;

  public abstract getPartyAccessRoleById(partyId: string): Observable<PartyAccessRoleState[]>;
  public abstract getPartyAccessRoles(): Observable<PartyAccessRoleState[]>;

  public abstract getPhoto(partyId: string, type: string): Observable<PhotoState>;

  public abstract addPhoto(photoState: PhotoState, type: string): Observable<PhotoState>;
  public abstract addAccountState(userState: UserState, organizationState: OrganizationState): Observable<AccountResponse>;

  public abstract updateCredential(credentialState: CredentialState): Observable<number>;

  public abstract updatePhoto(partyId: string, photoState: PhotoState, type: string): Observable<number>;

}
