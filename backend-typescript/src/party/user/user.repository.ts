import {Observable} from "rxjs/Observable";
import {User} from "./user";

export interface UserRepository {

  findUser(searchStr:string, pageSize:number):Observable<User[]>;

  getUsers(pageNumber:number, pageSize:number, order:string):Observable<User[]>;

  getUserCount():Observable<number>;

  getUser(partyId:string):Observable<User>;

  saveUser(user:User):Observable<User>;

  deleteUser(partyId:string):Observable<number>;

  updateUser(partyId:string, user:User):Observable<number>;

}
