import {Observable} from "rxjs/Observable";
import {User} from "./user";
import {Person} from "../person/person";

export interface UserRepository {

  findUser(searchStr:string, pageSize:number):Observable<User[]>;

  getUsers(pageNumber:number, pageSize:number, order:string):Observable<User[]>;

  getUserCount():Observable<number>;

  getUser(partyId:string):Observable<User>;

  getPerson(partyId:string):Observable<Person>;

  getPersonByIds(partyIds:string[]):Observable<Person[]>;

  saveUser(user:User):Observable<User>;

  deleteUser(partyId:string):Observable<number>;

  updateUser(partyId:string, user:User):Observable<number>;

}
