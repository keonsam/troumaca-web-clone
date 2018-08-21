import {UnitOfMeasureClient} from './unit.of.measure.client';
import {Observable} from 'rxjs';
import {UnitOfMeasureStates} from './unit.of.measure.states';

export class UnitOfMeasureClientMock extends UnitOfMeasureClient {

  public findUnitOfMeasureStates(searchStr: string, pageSize: number): Observable<UnitOfMeasureStates> {
    throw new Error('Method not implemented.');
  }

}
