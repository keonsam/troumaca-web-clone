import {createUserRepository} from './user.repository.factory';
import {UserRepository} from "./user.repository";
import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {shapeUsersResponse} from "./user.response.shaper";
import {Result} from "../../result.success";
import {CredentialRepository} from "../../authentication/credential/credential.repository";
import {createCredentialRepositoryFactory} from "../../authentication/credential/credential.repository.factory";
import {Credential} from "../../authentication/credential/credential";
import * as generatePassword from 'password-generator';


export class UserOrchestrator {

  private userRepository:UserRepository;
  private credentialRepository: CredentialRepository;
  private credential: Credential;

  constructor() {
    this.credential = new Credential();
    this.userRepository = createUserRepository();
    this.credentialRepository = createCredentialRepositoryFactory();
  }

    getUsers (number, size, field, direction):Observable<any> {
      let sort = getSortOrderOrDefault(field, direction);
      return this.userRepository
        .getUsers(number, size, sort)
        .flatMap(value => {
          return this.userRepository
            .getUserCount()
            .map(count => {
              let shapeUsersResp:any = shapeUsersResponse(value, number, size, value.length, count, sort);
              return new Result<any>(false, "users", shapeUsersResp);
            });
        });
    };

    getUser (partyId):Observable<User> {
      return this.userRepository.getUser(partyId);
    };

    saveUser (user):Observable<User>{
      return this.userRepository.saveUser(user)
        .switchMap(user => {
          if(!user){
            return Observable.of(user)
          }else {
              this.credential.partyId = user.partyId;
              this.credential.username = user.username;
              this.credential.password = generatePassword();
              this.credential.status = "ACTIVE";
            return this.credentialRepository.addCredential(this.credential)
              .map(credential =>{
                if(!credential){
                  return credential;
                }else {
                  return user;
                }
              });
          }
        });
    };

    deleteUser (partyId):Observable<number> {
      return this.userRepository.deleteUser(partyId)
        .flatMap(value => {
          if(!value) {
            return Observable.of(value);
          }else {
            return this.credentialRepository.deleteCredential(partyId);
          }
        });
    };

    updateUser (partyId, user):Observable<number> {
      return this.userRepository.updateUser(partyId, user);
    };

}
