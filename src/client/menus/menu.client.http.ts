import {MenuClient} from './menu.client';
import {Observable} from 'rxjs';
import {MenuState} from './menu.state';
import {UUIDGenerator} from '../../uuid.generator';
import {App} from "../../lobby/app";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';

export class MenuClientHttp extends MenuClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  getMenuByName(menuName: string): Observable<MenuState> {
    return undefined;
  }

  getTopMenuState(isLoggedIn: boolean): Observable<MenuState> {
    throw undefined;
  }

  getLeftMenuStateByName(menuName: string): Observable<MenuState> {
    return undefined;
  }

  getLeftMenuStateById(menuId: string): Observable<MenuState> {
    return undefined;
  }

  getApps(): Observable<App[]> {
    const url = `${this.hostPort}/apps`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<App[]>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }
}
