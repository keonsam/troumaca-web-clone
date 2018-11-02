import {OrganizationClient} from './organization.client';
import {UUIDGenerator} from '../../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Organizations } from '../../../parties/organizations';
import {map} from 'rxjs/operators';
import { Organization } from '../../../parties/organization';
import { JoinOrganization } from '../../../parties/join.organization';

export class OrganizationClientHttp implements OrganizationClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  findOrganizations(searchStr: string, pageSize: number): Observable<Organization[]> {
    const url = `${this.hostPort}/organizations/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Organization[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  addOrganizationRequest(request: JoinOrganization): Observable<JoinOrganization> {
    const url = `${this.hostPort}/organizations/request-access`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<JoinOrganization>(url, request, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<Organizations> {
    const url = `${this.hostPort}/organizations?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Organizations>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  public getOrganizationState(partyId?: string): Observable<Organization> {
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

  public addOrganizationState(organizationState: Organization, profile?: boolean): Observable<Organization> {
    let url: string;
    if (profile) {
      url = `${this.hostPort}/organizations/profiles`;
    }else {
      url = `${this.hostPort}/organizations`;
    }
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<Organization>(url, organizationState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public deleteOrganization(partyId: string): Observable<number> {
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

  public updateOrganization(organizationState: Organization): Observable<number> {
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
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }
}
