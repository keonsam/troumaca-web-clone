import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {LobbyClient} from "./lobby.client";
import {App} from "../../lobby/app";
import {Subscription} from "../../lobby/subscription";

export class LobbyClientHttp extends LobbyClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  getApps(): Observable<App[]> {
    const url = `${this.hostPort}/subscriptions/apps`;
      const httpOptions = {
        headers: this.jsonHttpHeaders()
      };
      return this.httpClient.get<App[]>(url, httpOptions)
        .pipe(map(data => {
          return data;
        }));
  }

  addSubscription(subscription: Subscription): Observable<Subscription> {
    const url = `${this.hostPort}/subscriptions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<Subscription>(url, subscription, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  private jsonHttpHeaders(): HttpHeaders {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });

    return httpHeaders;
  }

}
