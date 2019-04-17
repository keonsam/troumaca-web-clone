import {environment} from '../../environments/environment';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UnitOfMeasureClient} from './unit.of.measure.client';
import {Observable} from 'rxjs';
import { UnitOfMeasures } from '../../unit-of-measure/unit.of.measures';
import { UnitOfMeasure } from '../../unit-of-measure/unit.of.measure';
import {map} from 'rxjs/operators';

export class UnitOfMeasureClientHttp extends UnitOfMeasureClient {

  hostPort = environment.hostPort;
  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient) {
    super();
  }

  findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]> {
    const url = `${this.hostPort}/unit-of-measures/find?q=${searchStr}&pageSize=${pageSize}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasure[]>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getUnitOfMeasures(pageNumber: number, pageSize: number, sortOrder: string): Observable<UnitOfMeasures> {
    const url = `${this.hostPort}/unit-of-measures?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasures>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  getUnitOfMeasure(unitOfMeasureId: string): Observable<UnitOfMeasure> {
    const url = `${this.hostPort}/unit-of-measures/${unitOfMeasureId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.get<UnitOfMeasure>(url, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  addUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure> {
    const url = `${this.hostPort}/unit-of-measures`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.post<UnitOfMeasure>(url, unitOfMeasure, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  updateUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<number> {
    const url = `${this.hostPort}/unit-of-measures/${unitOfMeasure.unitOfMeasurementId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.put<number>(url, unitOfMeasure, httpOptions).pipe(map(data => {
      return data;
    }));
  }

  deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number> {
    const url = `${this.hostPort}/unit-of-measures/${unitOfMeasureId}`;
    const httpOptions = {
      headers: this.jsonHttpHeaders()
    };
    return this.httpClient.delete<number>(url, httpOptions).pipe(map(data => {
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
