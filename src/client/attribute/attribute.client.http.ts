import {AttributeClient} from './attribute.client';
import {UUIDGenerator} from '../../uuid.generator';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AttributeState} from './attribute.state';
import {AttributeStates} from './attribute.states';
import {DataTypeState} from './data.type.state'
import {UnitOfMeasureState} from '../unit-of-measure/unit.of.measure.state';

export class AttributeClientHttp extends AttributeClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public getDataTypes(): Observable<DataTypeState[]>{
    const url = `${this.hostPort}/data-types`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<DataTypeState[]>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }
  public getAttributesStates(pageNumber: number, pageSize: number, sortOrder: string): Observable<AttributeStates> {
    const url = `${this.hostPort}/attributes?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<AttributeStates>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  public getAttributeState(attributeId: string): Observable<AttributeState>{
    const url = `${this.hostPort}/attributes/${attributeId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .get<AttributeState>(url, httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

  public findUnitOfMeasureIdState(searchStr: string, pageSize: number): Observable<UnitOfMeasureState[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasureState[]>(url, {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).pipe(map(data => {
      return data;
    }));
  }

  public addAttribute(attributeState: AttributeState): Observable<AttributeState> {
    const url = `${this.hostPort}/attributes`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient
    .post<AttributeState>(url, attributeState.toJson(), httpOptions)
    .pipe(map(data => {
      return data;
    }));
  }

 public updateAttribute(attributeId: string, attributeState: AttributeState): Observable<number> {
   const url = `${this.hostPort}/attributes/${attributeId}`;
   const httpOptions = {
     headers: this.jsonHttpHeaders()
   };
   return this.httpClient
   .put<number>(url, attributeState.toJson(), httpOptions)
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
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type':  'application/json',
      'correlationId': this.uuidGenerator.generateUUID()
    });
    return httpHeaders;
  }
}
