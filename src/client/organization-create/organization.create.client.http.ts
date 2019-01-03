import {OrganizationCreateClient} from "./organization.create.client";
import {Organization} from "../../parties/organization";
import {Observable} from "rxjs";
import {UUIDGenerator} from "../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

export class OrganizationCreateClientHttp implements OrganizationCreateClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {}

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
