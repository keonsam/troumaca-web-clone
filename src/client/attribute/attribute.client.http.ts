import {AttributeClient} from './attribute.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataType} from "../../attributes/data.type";
import {Attributes} from "../../attributes/attributes";
import {Attribute} from "../../attributes/attribute";

export class AttributeClientHttp extends AttributeClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public getDataTypes(): Observable<DataType[]> {
    const url = `${this.hostPort}/data-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<DataType[]>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public getAttributesStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<Attributes> {
    const url = `${this.hostPort}/attributes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<Attributes>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAttribute(attributeId: string): Observable<Attribute> {
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .get<Attribute>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public addAttribute(attributeState: Attribute): Observable<Attribute> {
    const url = `${this.hostPort}/attributes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .post<Attribute>(url, attributeState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public updateAttribute(attributeId: string, attributeState: Attribute): Observable<number> {
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    delete attributeState.dataType;
    delete attributeState.unitOfMeasure;
    return this.httpClient
      .put<number>(url, attributeState, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }

  public deleteAttribute(attributeId: string): Observable<number> {
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
      .delete<number>(url, httpOptions)
      .pipe(map(data => {
        return data;
      }));
  }


  private jsonHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
  }
}
