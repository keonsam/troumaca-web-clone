import {MenuClient} from './menu.client';
import {Observable} from 'rxjs';
import {MenuState} from './menu.state';
import {UUIDGenerator} from '../../uuid.generator';
// import {App} from "../../lobby/app";
// import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../../environments/environment';
import {UserMenu} from '../../menu/user.menu';

export class MenuClientHttp extends MenuClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  // getTopMenuState(isLoggedIn: boolean): Observable<MenuState> {
  //   throw undefined;
  // }
  //
  // getApps(): Observable<App[]> {
  //   const url = `${this.hostPort}/apps`;
  //   const httpOptions = {
  //     headers: this.jsonHttpHeaders()
  //   };
  //   return this.httpClient.get<App[]>(url, httpOptions)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }
  //
  // getUserMenu(): Observable<UserMenu> {
  //   const url = `${this.hostPort}/users-menu`;
  //   const httpOptions = {
  //     headers: this.jsonHttpHeaders()
  //   };
  //   return this.httpClient.get<UserMenu>(url, httpOptions)
  //     .pipe(map(data => {
  //       return data;
  //     }));
  // }
  //
  // private jsonHttpHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'correlationId': this.uuidGenerator.generateUUID()
  //   });
  // }
}
