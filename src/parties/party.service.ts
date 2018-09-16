import {PartyRepository} from './party.repository';
import {Observable} from 'rxjs';
import {User} from './user';
import {Credential} from './credential';
import {Organization} from './organization';
import {Organizations} from './organizations';
import {AccountResponse} from './account.response';
import {Photo} from './photo';

export class PartyService {

  constructor(private partyRepository: PartyRepository) {
  }

  public logOutUser(): Observable<boolean> {
    return this.partyRepository.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.partyRepository.getPartyId();
  }

  public getPhoto(partyId: string, type: string): Observable<Photo> {
    return this.partyRepository.getPhoto(partyId, type);
  }

  public addPhoto(photo: Photo, type: string): Observable<Photo> {
    return this.partyRepository.addPhoto(photo, type);
  }

  public addAccount(user: User, organization: Organization ): Observable<AccountResponse> {
    return this.partyRepository.addAccount(user, organization);
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.partyRepository.updateCredential(credential);
  }

  public updatePhoto(partyId: string, photo: Photo, type: string): Observable<number> {
    return this.partyRepository.updatePhoto(partyId, photo, type);
  }

}
