import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {LobbyClient} from "./lobby.client";
import {App} from "../../lobby/app";
import {environment} from '../../environments/environment';

export class LobbyClientHttp extends LobbyClient {
  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
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
