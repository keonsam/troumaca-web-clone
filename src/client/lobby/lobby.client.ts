import {Observable} from "rxjs";
import {App} from "../../lobby/app";


export abstract class LobbyClient {
  abstract getApps(): Observable<App[]>;
}
