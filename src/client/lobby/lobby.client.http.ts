import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from "rxjs/operators";
import {LobbyClient} from "./lobby.client";
import {ModuleState} from "./module.state";
import {SubscriptionState} from "./subscription.state";

export class LobbyClientHttp extends LobbyClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  getModules(): Observable<ModuleState[]> {
    const url = `${this.hostPort}/subscriptions/modules`;
      const httpOptions = {
        headers: this.jsonHttpHeaders()
      };
      return this.httpClient.get<ModuleState[]>(url, httpOptions)
        .pipe(map(data => {
          return data;
        }));
  }

  addSubscription(subscription: SubscriptionState): Observable<SubscriptionState> {
    const url = `${this.hostPort}/subscriptions`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<SubscriptionState>(url, subscription.toJson(), httpOptions)
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
