import {OrganizationClient} from './organization.client';
import {UUIDGenerator} from '../../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Organizations } from '../../../parties/organizations';
import {map} from 'rxjs/operators';
import { Organization } from '../../../parties/organization';
import {environment} from '../../../environments/environment';

export class OrganizationClientHttp implements OrganizationClient {
  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
  }

  getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    const url = `${this.hostPort}/organizations?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Organizations>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  getOrganizationState(partyId?: string): Observable<Organization> {
    const url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<Organization>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addOrganizationState(organizationState: Organization): Observable<Organization> {
    const url = `${this.hostPort}/organizations`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Organization>(url, organizationState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  deleteOrganization(partyId: string): Observable<number> {
    const url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .delete<number>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateOrganization(organizationState: Organization): Observable<number> {
    const url = `${this.hostPort}/organizations/${organizationState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, organizationState, httpOptions)
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
