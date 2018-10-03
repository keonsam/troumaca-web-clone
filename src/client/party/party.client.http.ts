import {UUIDGenerator} from '../../uuid.generator';
import {PartyClient} from './party.client';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';

export class PartyClientHttp implements PartyClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }



  public logOutUser(): Observable<boolean> {
    const url = `${this.hostPort}/sessions/log-out-user`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<boolean>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getPartyId(): Observable<string> {
    const url = `${this.hostPort}/sessions/partyId`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .get<string>(url, httpOptions)
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
