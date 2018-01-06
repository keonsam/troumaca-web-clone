import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import {UUIDGenerator} from "../../uuid.generator";
import {SessionClient} from "./session.client";
import {Observable} from "rxjs/Observable";

export class SessionClientMock extends SessionClient {

  private _isAuthenticated:boolean;
  private _activeSessionExists:boolean;

  constructor(private uuidGenerator: UUIDGenerator) {
    super();
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  set setAuthenticated(value: boolean) {
    this._isAuthenticated = value;
  }

  get activeSessionExists(): boolean {
    return this._activeSessionExists;
  }

  set setActiveSessionExists(value: boolean) {
    this._activeSessionExists = value;
  }

  get isLoggedIn(): Observable<boolean> {
    // if (!this.isAuthenticated) {
    //   return Observable.of(false)
    // }

    // if (!this.activeSessionExists) {
    //   return Observable.of(false)
    // }

    return Observable.of(true);
  }

}