import {UnitOfMeasure} from './unit.of.measure';
import {Observable} from 'rxjs';

export abstract class UnitOfMeasureRepository {
  public abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;

}
