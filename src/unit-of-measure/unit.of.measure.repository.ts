import {UnitOfMeasure} from './unit.of.measure';
import {Observable} from 'rxjs';

export abstract class UnitOfMeasureRepository {
  public abstract getUnitOfMeasures(): Observable<UnitOfMeasure>;
}
