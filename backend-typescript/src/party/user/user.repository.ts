import {Observable} from "rxjs/Observable";
import {User} from "./user";

export interface UserRepository {

  getUsers(pageNumber:number, pageSize:number, order:string):Observable<User[]>;

  getUserCount():Observable<number>;

  getUser(userId:string):Observable<User>;

  saveUser(user:User):Observable<User>;

  deleteUser(userId:string):Observable<number>;

  updateUser(userId:string, user:User):Observable<number>;

}
