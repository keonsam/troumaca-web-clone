import {User} from './user';
import {Observable} from 'rxjs';
import {Credential} from './credential';
import {Organization} from './organization';
import {AccountResponse} from './account.response';
import {Photo} from './photo';

export abstract class PartyRepository {

  abstract logOutUser(): Observable<boolean>;

  abstract getPartyId(): Observable<string>;

  abstract getPhoto(partyId: string, type: string): Observable<Photo>;

  abstract addPhoto(photo: Photo, type: string): Observable<Photo>;

  abstract addAccount(user: User, organization: Organization): Observable<AccountResponse>;

  abstract updateCredential(credential: Credential): Observable<number>;

  abstract updatePhoto(partyId: string, photo: Photo, type: string): Observable<number>;
}
