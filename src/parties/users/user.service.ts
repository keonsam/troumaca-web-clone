import { UserRepository} from './user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../access-roles/access.role';
import {Users} from '../users';
import {UserResponse} from '../user.response';
import {PartyAccessRole} from '../party.access.role';
import {User} from '../user';
import { Credential } from "../../authentication/credential";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  public findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.userRepository.findAccessRole(searchStr, pageSize);
  }

  public getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.userRepository.getUsers(pageNumber, pageSize, sortOrder);
  }

  public getUser(partyId?: string): Observable<UserResponse> {
    return this.userRepository.getUser(partyId);
  }

  public addUser(user: User, credential?: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<User> {
    return this.userRepository.addUser(user, credential, partyAccessRoles);
  }

  public updateUser(user: User, credential: Credential, partyAccessRoles?: PartyAccessRole[]): Observable<number> {
    return this.userRepository.updateUser(user, credential, partyAccessRoles);
  }

  public deleteUser(partyId: string): Observable<number> {
    return this.userRepository.deleteUser(partyId);
  }
}
