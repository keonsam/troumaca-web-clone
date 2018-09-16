import {PartyRepository} from '../../parties/party.repository';
import {PersonClient} from '../../client/party/person.client';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {User} from '../../parties/user';
import {Credential} from '../../parties/credential';
import {Organization} from '../../parties/organization';

import {mapObjectProps} from '../../mapper/object.property.mapper';
import {UserState} from '../../client/party/user.state';
import {OrganizationState} from '../../client/party/organization.state';
import {CredentialState} from '../../client/party/credential.state';
import {AccountResponse} from '../../parties/account.response';
import {PartyAccessRole} from '../../parties/party.access.role';
import {Photo} from '../../parties/photo';
import {PhotoState} from '../../client/party/photo.state';

export class PartyRepositoryAdapter extends PartyRepository {

  constructor(private personClient: PersonClient) {
    super();
  }

  public logOutUser(): Observable<boolean> {
    return this.personClient.logOutUser();
  }

  public getPartyId(): Observable<string> {
    return this.personClient.getPartyId();
  }

  public getPartyAccessRoleById(partyId: string): Observable<PartyAccessRole[]> {
    return this.personClient
      .getPartyAccessRoleById(partyId)
      .pipe(map(values => {
        return values.map( value => {
          return mapObjectProps(value, new PartyAccessRole())
        });
      }));
  }

  public getPartyAccessRoles(): Observable<PartyAccessRole[]> {
    return this.personClient.getPartyAccessRoles()
      .pipe(map(value => {
        return value.map( next => {
          return mapObjectProps(next , new PartyAccessRole());
        });
      }));
  }

  public getPhoto(partyId: string, type: string): Observable<Photo> {
    return this.personClient.getPhoto(partyId, type)
      .pipe(map(value => {
        return mapObjectProps(value, new Photo());
      }));
  }



  public addPhoto(photo: Photo, type: string, ): Observable<Photo> {
    return this.personClient.addPhoto(mapObjectProps(photo, new PhotoState()), type)
      .pipe(map(value => {
        return mapObjectProps(value, new Photo());
      }));
  }

  public addAccount(user: User, organization: Organization): Observable<AccountResponse> {
    return this.personClient
    .addAccountState(mapObjectProps(user, new UserState()), mapObjectProps(organization, new OrganizationState()))
    .pipe(map(value => {
      return mapObjectProps(value, new AccountResponse());
    }));
  }

  public updateCredential(credential: Credential): Observable<number> {
    return this.personClient.updateCredential(mapObjectProps(credential, new CredentialState()));
  }

  public updatePhoto(partyId: string, photo: Photo, type: string): Observable<number> {
    return this.personClient.updatePhoto(partyId, mapObjectProps(photo, new PhotoState()), type);
  }

}
