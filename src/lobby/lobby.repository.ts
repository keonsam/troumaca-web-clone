import {Observable} from "rxjs";
import {App} from "./app";

export abstract class LobbyRepository {

  abstract getApps(): Observable<App[]>;
}
