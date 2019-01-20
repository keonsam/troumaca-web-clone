import {OrganizationCreateClient} from "./organization.create.client";
import {Organization} from "../../parties/organization";
import {Observable} from "rxjs";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from '../../environments/environment';

export class OrganizationCreateClientHttp implements OrganizationCreateClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {}

  createOrganization(organization: Organization): Observable<Organization> {
    const url = `${this.hostPort}/organizations/customer`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Organization>(url, organization, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  };
}
