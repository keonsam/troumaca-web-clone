import { UserRepository} from './user.repository';
import {Observable} from 'rxjs';
import {AccessRole} from '../../access-roles/access.role';
import {Users} from '../users';
import {User} from '../user';
import { Credential } from '../../authentication/credential';
import {ValidResponse} from '../../authentication/valid.response';
import {UserMe} from './user-me/user.me';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAccessRole(searchStr: string, pageSize: number): Observable<AccessRole[]> {
    return this.userRepository.findAccessRole(searchStr, pageSize);
  }

  getUsers(pageNumber: number, pageSize: number, sortOrder: string): Observable<Users> {
    return this.userRepository.getUsers(pageNumber, pageSize, sortOrder);
  }

  getUser(partyId?: string): Observable<User> {
    return this.userRepository.getUser(partyId);
  }

  addUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<User> {
    return this.userRepository.addUser(user, credential, partyAccessRoles);
  }

  updateUser(user: User, credential: Credential, partyAccessRoles: string[]): Observable<number> {
    return this.userRepository.updateUser(user, credential, partyAccessRoles);
  }

  deleteUser(partyId: string): Observable<number> {
    return this.userRepository.deleteUser(partyId);
  }
  
  getUserMe(): Observable<UserMe> {
    return this.userRepository.getUserMe();
  }

  updateUserMe(user: User, credential: Credential): Observable<number> {
    return this.userRepository.updateUserMe(user, credential);
  }

  // Validation

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    return this.userRepository.isValidUsername(username, partyId);
  }

  isValidPassword(password: string): Observable<ValidResponse> {
    return this.userRepository.isValidPassword(password);
  }
}
