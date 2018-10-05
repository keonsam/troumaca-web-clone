import {OrganizationClient} from "./organization.client";
import {UUIDGenerator} from "../../../uuid.generator";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrganizationStates} from "../organization.states";
import {map} from "rxjs/operators";
import {OrganizationState} from "../organization.state";
import {JoinOrganizationState} from "../join.organization.state";

export class OrganizationClientHttp implements OrganizationClient {
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  findOrganizations(searchStr: string, pageSize: number): Observable<OrganizationState[]> {
    const url = `${this.hostPort}/organizations-find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<OrganizationState[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  addOrganizationRequest(request: JoinOrganizationState): Observable<JoinOrganizationState> {
    const url = `${this.hostPort}/organizations/access-requests`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<JoinOrganizationState>(url, request.toJson(), httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getOrganizations(pageNumber: number, pageSize: number, sortOrder: string): Observable<OrganizationStates> {
    const url = `${this.hostPort}/organizations?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<OrganizationStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }


  public getOrganizationState(partyId?: string): Observable<OrganizationState>{
    const url = `${this.hostPort}/organizations/${partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<OrganizationState>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addOrganizationState(organizationState: OrganizationState, profile?: boolean): Observable<OrganizationState> {
    let url: string;
    if (profile) {
      url = `${this.hostPort}/organizations/profile`;
    }else {
      url = `${this.hostPort}/organizations`;
    }
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };

    return this.httpClient
      .post<OrganizationState>(url, organizationState.toJson(), httpOptions)
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

  public updateOrganization(organizationState: OrganizationState): Observable<number> {
    const url = `${this.hostPort}/organizations/${organizationState.partyId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, organizationState.toJson(), httpOptions)
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
