import {Observable} from 'rxjs';
import {UnitOfMeasures} from './unit.of.measures';
import {UnitOfMeasure} from './unit.of.measure';

export abstract class UnitOfMeasureRepository {
  abstract findUnitOfMeasures(searchStr: string, pageSize: number): Observable<UnitOfMeasure[]>;
  abstract getUnitOfMeasures(pageNumber: number, pageSize: number, sortOrder: string): Observable<UnitOfMeasures>;
  abstract getUnitOfMeasure(unitOfMeasureId: string): Observable<UnitOfMeasure>;
  abstract addUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<UnitOfMeasure>;
  abstract updateUnitOfMeasure(unitOfMeasure: UnitOfMeasure): Observable<number>;
  abstract deleteUnitOfMeasure(unitOfMeasureId: string): Observable<number>;
}
