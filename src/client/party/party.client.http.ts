import {UUIDGenerator} from '../../uuid.generator';
import {PartyClient} from './party.client';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ValidResponse} from "../../authentication/valid.response";
import {ContactInfo} from "../../parties/contact-info/contact.info";
import {Address} from "../../parties/address/address";

export class PartyClientHttp implements PartyClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
  }

  isValidUsername(username: string, partyId?: string): Observable<ValidResponse> {
    const url = `${this.hostPort}/authentication/validate-username`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    const query = {
      username: username,
      partyId: partyId
    };
    return this.httpClient
      .post<ValidResponse>(url, query, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  getContactInfo(type: string): Observable<ContactInfo> {
    const url = `${this.hostPort}/parties/contact-info?type=${type}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<ContactInfo>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addContactInfo(type: string, contactInfo: ContactInfo): Observable<ContactInfo> {
    const url = `${this.hostPort}/parties/contact-info`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<ContactInfo>(url, {type, contactInfo}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateContactInfo(type: string, contactInfo: ContactInfo): Observable<number> {
    const url = `${this.hostPort}/parties/contact-info/${contactInfo.contactInfoId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, {type, contactInfo}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  // address

  getAddress(type: string): Observable<Address> {
    const url = `${this.hostPort}/parties/address?type=${type}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<Address>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  addAddress(type: string, address: Address): Observable<Address> {
    const url = `${this.hostPort}/parties/address`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<Address>(url, {type, address}, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  updateAddress(type: string, address: Address): Observable<number> {
    const url = `${this.hostPort}/parties/address/${address.siteId}`;

    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .put<number>(url, {type, address}, httpOptions)
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
