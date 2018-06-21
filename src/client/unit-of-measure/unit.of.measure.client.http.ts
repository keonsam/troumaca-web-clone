import {UnitOfMeasureClient} from './unit.of.measure.client';
import {UUIDGenerator} from '../../uuid.generator';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UnitOfMeasureStates} from './unit.of.measure.states';

export class UnitOfMeasureClientHttp extends UnitOfMeasureClient {

  constructor(private uuidGenerator: UUIDGenerator,
              private httpClient: HttpClient,
              private hostPort: string) {
    super();
  }

  public findUnitOfMeasureStates(searchStr: string, pageSize: number): Observable<UnitOfMeasureStates> {
    const array = [];
    array.push(this.hostPort);
    array.push('/unit-of-measures');

    const queryStr = [];
    if (searchStr) {
      queryStr.push('q=' + searchStr);
    }

    if (pageSize) {
      queryStr.push('pageSize=' + searchStr);
    }

    if (queryStr.length > 0) {
      array.push('?');
      array.push(queryStr.join('&'));
    }

    return this.httpClient.get<UnitOfMeasureStates>(array.join(''), {
      headers: new HttpHeaders().set('correlationId', this.uuidGenerator.generateUUID())
    }).map(data => {
      return data;
    });
  }

}
