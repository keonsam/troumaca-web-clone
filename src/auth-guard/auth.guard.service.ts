import {Observable} from "rxjs/Observable";

export abstract class AuthGuardService {
  public abstract get isLoggedIn():Observable<boolean>;
  public abstract get partyIdExist():Observable<boolean>;
  public abstract get redirectUrl():string;
  public abstract set redirectUrl(url:string);
}
